import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'
import UpdateCustomerUseCase from './update.customer.usecase'

const customer = CustomerFactory.createWithAddress('João', new Address (
  'Street', 1934, 'Zip', 'City'
))

const MakeInput = () => ({
  id: customer.id,
  name: 'Name Update',
  address: {
    street: 'Street Update',
    number: 1921,
    zip: 'Zip Update',
    city: 'City Update'
  }
})

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(customer),
    findAll: jest.fn()
  }
}

describe('Unit test for customer  update use case', () => {
  test('Should update a customer', async () => {
    const customerRepository = MockRepository()
    const sut = new UpdateCustomerUseCase(customerRepository)

    const input = MakeInput()

    const output = await sut.execute(input)

    expect(output).toEqual(input)
  })

  test('Should thrown an error when name is missing', async () => {
    const customerRepository = MockRepository()
    const sut = new UpdateCustomerUseCase(customerRepository)

    const input = MakeInput()

    input.name = ""

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow("Name is required")
  })

  test('Should thrown an error when street is missing', async () => {
    const customerRepository = MockRepository()
    const sut = new UpdateCustomerUseCase(customerRepository)

    const input = MakeInput()

    input.address.street = ""

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow("Street is required")
  })
})