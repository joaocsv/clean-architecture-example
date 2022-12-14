import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'
import ListCustomerUseCase from './list.customer.usecase'

const customer1 = CustomerFactory.createWithAddress('João C.', new Address('Street', 1935, 'Zip', 'City'))
const customer2 = CustomerFactory.createWithAddress('Jhon Doe', new Address('Street', 1923, 'Zip', 'City'))

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue([customer1, customer2])
  }
}

describe('Unit test for listing customer use case', () => {
  test('Should list all customers', async () => {
    const customerRepository = MockRepository()
    const sut = new ListCustomerUseCase(customerRepository)
    
    const output = await sut.execute({})

    expect(output.customers.length).toBe(2)
    
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.address.street)

    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.street).toBe(customer2.address.street)

  })
})