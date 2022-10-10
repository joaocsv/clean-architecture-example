import CreateCustomerUseCase from './create.customer.usecase'

const MockCustomerRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn()
  }
}

const input = {
  name: 'João C.',
  address: {
    street: 'Rua XV',
    number: 1290,
    zip: 'Zip',
    city: 'City'
  }
}

describe('Unit test create customer use case', () => {
  test('should create a customer', async () => {
    const customerRepository = MockCustomerRepository()
    const sut = new CreateCustomerUseCase(customerRepository)

    const output = await sut.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: 'João C.',
      address: {
        street: 'Rua XV',
        number: 1290,
        zip: 'Zip',
        city: 'City'
      }
    })
  })

  test('should thrown an error when name is missing', async () => {
    const customerRepository = MockCustomerRepository()
    const sut = new CreateCustomerUseCase(customerRepository)

    input.name = ""

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow('Name is required')
  })

  test('should thrown an error when street is missing', async () => {
    const customerRepository = MockCustomerRepository()
    const sut = new CreateCustomerUseCase(customerRepository)

    input.address.street = ""

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow('Street is required')
  })
})