import Customer from '../../../domain/customer/entity/customer'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import Address from '../../../domain/customer/value-object/address'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import FindCustomerUseCase from './find.customer.usecase'

const customer = new Customer('123', 'João')
const address = new Address('Street', 123, 'Zip', 'City')
customer.changeAddress(address)

const MockCustomerRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn()
  }
}

describe('Test find customer usecase', () => {
  test('should find a customer', async () => {
    const customerRepository = MockCustomerRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: '123'
    }

    const output = {
      id: '123',
      name: 'João',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City'
      }
    }

    const result = await usecase.execute(input)

    expect(output).toStrictEqual(result)

  })

  test('should not find a customer', async () => {
    const customerRepository = MockCustomerRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    customerRepository.find.mockImplementationOnce(() => { throw new Error('Customer not found') })

    const input = {
      id: '123'
    }

    const promiseResult = usecase.execute(input)

    await expect(promiseResult).rejects.toThrow('Customer not found')
  })
})