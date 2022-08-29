import { Sequelize } from 'sequelize-typescript'
import ProductRepository from './product.repository'
import ProductModel from '../model/product.model'
import Product from '../../../../domain/entity/product'

describe('Product unit tests', () => {
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

  test('Should create a product', async () => {
    const productRepository = new ProductRepository()
    
    const product = new Product('1', 'product 1', 2.90)

    await productRepository.create(product)
  
    const foundProduct = await ProductModel.findOne({ where: { id: '1' }})

    expect(foundProduct?.toJSON()).toStrictEqual({
      id: '1',
      name: 'product 1',
      price: 2.90
    })
  })

  test('Should update a product', async () => {
    const productRepository = new ProductRepository()
    
    const product = new Product('1', 'product 1', 2.90)

    await productRepository.create(product)
  
    const foundProduct = await ProductModel.findOne({ where: { id: '1' }})

    expect(foundProduct?.toJSON()).toStrictEqual({
      id: '1',
      name: 'product 1',
      price: 2.90
    })

    product.changeName('product 2')
    product.changePrice(300)

    await productRepository.update(product)

    const foundProduct2 = await ProductModel.findOne({ where: { id: '1' }})
    
    expect(foundProduct2?.toJSON()).toStrictEqual({
      id: '1',
      name: 'product 2',
      price: 300
    })
  })

  test('Should find a product', async () => {
    const productRepository = new ProductRepository()
    
    const product = new Product('1', 'product 1', 2.90)

    await productRepository.create(product)
  
    const foundModel = await ProductModel.findOne({ where: { id: '1' }})

    const foundProduct = await productRepository.find('1')

    expect(foundModel?.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price
    })
  })

  test('Should find all products', async () => {
    const productRepository = new ProductRepository()
    
    const product = new Product('1', 'product 1', 2.90)

    await productRepository.create(product)

    const product2 = new Product('2', 'product 2', 2.90)

    await productRepository.create(product2)
  
    const foundProducts = await productRepository.findAll()

    const products = [product, product2]

    expect(products).toEqual(foundProducts)
  })
})