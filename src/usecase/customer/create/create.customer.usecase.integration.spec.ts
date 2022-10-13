import { Sequelize } from 'sequelize-typescript'
import Customer from '../../../domain/customer/entity/customer'
import Address from '../../../domain/customer/value-object/address'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/model/customer.model'
import CreateCustomerUseCase from './create.customer.usecase'

describe('Test find customer usecase', () => {
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

  test('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const usecase = new CreateCustomerUseCase(customerRepository)

    const output = await usecase.execute({
      name: 'João',
      address: {
        street: 'Street',
        city: 'City',
        zip: 'Zip',
        number: 1000
      }
    })

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: 'João',
      address: {
        street: 'Street',
        city: 'City',
        zip: 'Zip',
        number: 1000
      }
    })
  })
})