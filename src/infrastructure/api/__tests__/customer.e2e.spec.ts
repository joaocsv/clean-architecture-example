import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should create a customer', async () => {
    const response = await request(app).post('/customer').send({
      name: 'John',
      address: {
        street: 'Street',
        city: 'City',
        zip: 'Zip',
        number: 123
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe('John')
    expect(response.body.address.street).toBe('Street')
    expect(response.body.address.city).toBe('City')
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zip).toBe('Zip')
  })

  test('should not create a customer', async () => {
    const response = await request(app).post('/customer').send({
      name: 'John'
    })

    expect(response.statusCode).toBe(500)
  })

  test('should list all customer', async () => {
    const createResponse = await request(app).post('/customer').send({
      name: 'John',
      address: {
        street: 'Street',
        city: 'City',
        zip: 'Zip',
        number: 123
      }
    })

    expect(createResponse.statusCode).toBe(200)

    const createResponse2 = await request(app).post('/customer').send({
      name: 'James',
      address: {
        street: 'Street 2',
        city: 'City 2',
        zip: 'Zip 2',
        number: 4324
      }
    })

    expect(createResponse2.statusCode).toBe(200)

    const listResponse = await request(app).get('/customer')

    expect(listResponse.statusCode).toBe(200)

    expect(listResponse.body.customers[0].name).toBe('John')
    expect(listResponse.body.customers[0].address.street).toBe('Street')
    expect(listResponse.body.customers[0].address.city).toBe('City')
    expect(listResponse.body.customers[0].address.zip).toBe('Zip')
    expect(listResponse.body.customers[0].address.number).toBe(123)

    expect(listResponse.body.customers[1].name).toBe('James')
    expect(listResponse.body.customers[1].address.street).toBe('Street 2')
    expect(listResponse.body.customers[1].address.city).toBe('City 2')
    expect(listResponse.body.customers[1].address.zip).toBe('Zip 2')
    expect(listResponse.body.customers[1].address.number).toBe(4324)

  })
})