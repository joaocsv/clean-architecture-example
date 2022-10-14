import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/model/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import CreateProductUseCase from './create.product.usecase'

describe('Test create product usecase', () => {
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

  test('should create a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const output = await usecase.execute({
      name: 'Product test',
      price: 2.90
    })

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: 'Product test',
      price: 2.90
    })
  })
})