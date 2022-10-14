import ProductModel from '../../../infrastructure/product/repository/sequelize/model/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import UpdateProductUseCase from './update.product.usecase'

import { Sequelize } from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'

describe('Test update product usecase', () => {
  let sequelize: Sequelize
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ ProductModel ])
    
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should update a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new UpdateProductUseCase(productRepository)

    const product = new Product('92158', 'Product Create', 2.90)

    await productRepository.create(product)

    const input = {
      id: '92158',
      name: 'Product Update',
      price: 3.32
    }

    const result = await usecase.execute(input)

    expect({
      id: '92158',
      name: 'Product Update',
      price: 3.32
    }).toEqual(result)
  })
})