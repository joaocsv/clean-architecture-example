import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('should create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Coca-cola 2L',
      price: 9.00,
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe('Coca-cola 2L')
    expect(response.body.price).toBe(9.00)
  })

  test('should not create a product', async () => {
    const response = await request(app).post('/product').send({
      price: 9.90
    })

    expect(response.statusCode).toBe(500)
  })

  test('should list all products', async () => {
    const createResponse = await request(app).post('/product').send({
      name: 'Coca-cola 2L',
      price: 9.00,
    })

    expect(createResponse.statusCode).toBe(200)

    const createResponse2 = await request(app).post('/product').send({
      name: 'Bala Mentos',
      price: 2.90,
    })

    expect(createResponse2.statusCode).toBe(200)

    const listResponse = await request(app).get('/product')

    expect(listResponse.statusCode).toBe(200)

    expect(listResponse.body.products[0].name).toBe('Coca-cola 2L')
    expect(listResponse.body.products[0].price).toBe(9.00)

    expect(listResponse.body.products[1].name).toBe('Bala Mentos')
    expect(listResponse.body.products[1].price).toBe(2.90)
  })
})