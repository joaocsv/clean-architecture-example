import Product from '../../../domain/product/entity/product'
import FindProductUseCase from './find.product.usecase'

const product = new Product('123', 'Product Test', 20.90)

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(product),
    findAll: jest.fn()
  }
}

describe('Test find product usecase', () => {
  test('should find a product', async () => {
    const productRepository = MockRepository()
    const sut = new FindProductUseCase(productRepository)

    const input = {
      id: '123'
    }

    const output = await sut.execute(input)

    expect(output).toEqual({
      id: '123',
      name: 'Product Test',
      price: 20.90
    })
  })

  test('should not find a product', async () => {
    const productRepository = MockRepository()
    const sut = new FindProductUseCase(productRepository)

    productRepository.find.mockImplementationOnce(() => { throw new Error('Product not found') })

    const input = {
      id: '123'
    }

    const promise = sut.execute(input)

    expect(promise).rejects.toThrow('Product not found')
  })
})