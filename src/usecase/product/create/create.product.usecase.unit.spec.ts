import CreateProductUseCase from './create.product.usecase'

const MockProductRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn()
  }
}

const MakeInput = () => {
  return {
    name: 'Product Test',
    price: 2.90
  }
}

describe('Unit test create product use case', () => {
  test('Should create a product', async () => {
    const productRepository = MockProductRepository()
    
    const sut = new CreateProductUseCase(productRepository)
    
    const output = await sut.execute(MakeInput())

    expect(output).toEqual({
      id: expect.any(String),
      name: 'Product Test',
      price: 2.90
    })
  })

  test('Should thrown an error when name is missing', async () => {
    const productRepository = MockProductRepository()
    const sut = new CreateProductUseCase(productRepository)

    const input = MakeInput()

    input.name = ""

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow('Name is required')
  })

  test('Should thrown an error when price is less than or equal to zero', async () => {
    const productRepository = MockProductRepository()
    const sut = new CreateProductUseCase(productRepository)

    const input = MakeInput()

    input.price = 0

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow('Price must be greater than zero')
  })
})