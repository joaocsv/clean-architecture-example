import { Sequelize } from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'
import ProductModel from '../../../infrastructure/product/repository/sequelize/model/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import FindProductUseCase from './find.product.usecase'

describe('Test find product usecase', () => {
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

  test('should find a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new FindProductUseCase(productRepository)

    const customer = new Product('123', 'Product test', 2.70)

    await productRepository.create(customer)

    const input = {
      id: '123'
    }

    const output = {
      id: '123',
      name: 'Product test',
      price: 2.70
    }

    const result = await usecase.execute(input)

    expect(output).toStrictEqual(result)
  })
})