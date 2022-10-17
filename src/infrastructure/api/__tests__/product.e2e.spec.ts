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
})