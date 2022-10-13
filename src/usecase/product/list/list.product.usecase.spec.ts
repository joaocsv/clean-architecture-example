import Product from '../../../domain/product/entity/product'
import ListProductUseCase from './list.product.usecase'

const product = new Product('123', 'Product Test', 20.90)
const product2 = new Product('421', 'Product Test 2', 2.23)

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue([product, product2])
  }
}

describe('Test unit list product use case', () => {
  test('Should list all products', async () => {
    const productRepository = MockRepository()
    const listProductUseCase = new ListProductUseCase(productRepository)

    const output = await listProductUseCase.execute({})

    expect(output.products[0].id).toBe(product.id)
    expect(output.products[0].name).toBe(product.name)
    expect(output.products[0].price).toBe(product.price)

    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
    expect(output.products[1].price).toBe(product2.price)
  })
})