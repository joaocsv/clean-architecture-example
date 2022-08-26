import { Sequelize } from 'sequelize-typescript'

import ProductModel from '../model/product.model'

describe('Product unit tests', () => {
  let sequelize: Sequelize
  
  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ ProductModel ])
    
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('Should create a product', () => {
    
  })
})