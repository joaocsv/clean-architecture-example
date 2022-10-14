import { Sequelize } from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'
import ProductModel from '../../../infrastructure/product/repository/sequelize/model/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import ListProductUseCase from './list.product.usecase'

describe('Test list product usecase', () => {
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

  test('should list all products', async () => {
    const productRepository = new ProductRepository()
    const usecase = new ListProductUseCase(productRepository)

    const product = new Product('12345', 'Product Test', 2.70)

    await productRepository.create(product)

    const product2 = new Product('42145', 'Product Test 2', 31.42)
    
    await productRepository.create(product2)

    const output = {
      products: [{
        id: '12345',
        name: 'Product Test',
        price: 2.70
      },
      {
        id: '42145',
        name: 'Product Test 2',
        price: 31.42
      }]
    }

    const result = await usecase.execute({})

    expect(output).toEqual(result)
  })
})