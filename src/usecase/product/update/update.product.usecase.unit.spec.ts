import Product from '../../../domain/product/entity/product'

import UpdateProductUseCase from './update.product.usecase'

const product = new Product('123', 'Product Test', 20.90)

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(product),
    findAll: jest.fn(),
    update: jest.fn()
  }
}

const MakeInput = () => {
  return {
    id: '123',
    name: 'Product Test Update',
    price: 15
  }
}

describe('Unit test update product use case', () => {
  test('Should update a product', async () => {
    const repository = MockRepository()
  
    const sut = new UpdateProductUseCase(repository)

    const output = await sut.execute(MakeInput())

    expect(output).toEqual(output)
  })

  test('Should thrown an error when name is missing', async () => {
    const repository = MockRepository()
    const sut = new UpdateProductUseCase(repository)

    const input = MakeInput()

    input.name = ""

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow('Name is required')
  })

  test('Should thrown an error when price is less than or equal to zero', async () => {
    const repository = MockRepository()
    const sut = new UpdateProductUseCase(repository)

    const input = MakeInput()

    input.price = 0

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow('Price must be greater than zero')
  })
})