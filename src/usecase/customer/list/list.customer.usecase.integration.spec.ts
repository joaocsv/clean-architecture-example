import { Sequelize } from 'sequelize-typescript'
import Customer from '../../../domain/customer/entity/customer'
import Address from '../../../domain/customer/value-object/address'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/model/customer.model'
import ListCustomerUseCase from './list.customer.usecase'

describe('Test list customer usecase', () => {
  let sequelize: Sequelize
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ CustomerModel ])
    
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should list all customers', async () => {
    const customerRepository = new CustomerRepository()
    const usecase = new ListCustomerUseCase(customerRepository)

    const customer1 = new Customer('123', 'João')
    const address1 = new Address('Street', 123, 'Zip', 'City')
    customer1.changeAddress(address1)

    await customerRepository.create(customer1)

    const customer2 = new Customer('333', 'Roberto Gren')
    const address2 = new Address('Street Two', 412, 'Zip Two', 'City Two')
    customer2.changeAddress(address2)

    await customerRepository.create(customer2)

    const output = {
      customers: [{
        id: '123',
        name: 'João',
        address: {
          street: 'Street',
          number: 123,
          zip: 'Zip',
          city: 'City'
        },
      },
      {
        id: '333',
        name: 'Roberto Gren',
        address: {
          street: 'Street Two',
          number: 412,
          zip: 'Zip Two',
          city: 'City Two'
        }
      }]
    }

    const result = await usecase.execute({})

    expect(output).toEqual(result)
  })
})