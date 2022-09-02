import CustomerRepository from './customer.repository'
import CustomerModel from './model/customer.model'
import Customer from '../../../../domain/customer/entity/customer'
import Address from '../../../../domain/customer/value-object/address'

import { Sequelize } from 'sequelize-typescript'

describe('Customer unit tests', () => {
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

  test('Should create a customer', async () => {
    const customerRepository = new CustomerRepository()

    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Rua xv', 22, '22311-22', 'Curitiba')
    
    customer.changeAddress(address)
    customer.actived()

    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '123' }})

    expect(customerModel?.toJSON()).toStrictEqual({
      id: '123',
      name: 'Customer 1',
      active: true,
      rewardPoints: 0,
      street: 'Rua xv',
      number: 22,
      zipcode: '22311-22',
      city: 'Curitiba',
    })
  })

  test('Should update a customer', async () => {
    const customerRepository = new CustomerRepository()

    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Rua xv', 22, '22311-22', 'Curitiba')
    
    customer.changeAddress(address)
    customer.actived()

    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '123' }})

    expect(customerModel?.toJSON()).toStrictEqual({
      id: '123',
      name: 'Customer 1',
      active: true,
      rewardPoints: 0,
      street: 'Rua xv',
      number: 22,
      zipcode: '22311-22',
      city: 'Curitiba',
    })

    customer.changeName('Customer 2')
    customer.addRewardPoints(20)

    await customerRepository.update(customer)

    const customerModel2 = await CustomerModel.findOne({ where: { id: '123' }})

    expect(customerModel2?.toJSON()).toStrictEqual({
      id: '123',
      name: 'Customer 2',
      active: true,
      rewardPoints: 20,
      street: 'Rua xv',
      number: 22,
      zipcode: '22311-22',
      city: 'Curitiba',
    })
  })

  test('Should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Rua xv', 22, '22311-22', 'Curitiba')
    
    customer.changeAddress(address)
    customer.actived()

    await customerRepository.create(customer)
  
    const foundModel = await CustomerModel.findOne({ where: { id: '123' }})

    const foundCustomer = await customerRepository.find('123')

    expect(foundModel?.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      active: foundCustomer.isActive,
      rewardPoints: foundCustomer.rewardPoints,
      street: foundCustomer.address.street,
      number: foundCustomer.address.number,
      zipcode: foundCustomer.address.zip,
      city: foundCustomer.address.city,
    })
  })

  test('Should find all customers', async () => {
    const customerRepository = new CustomerRepository()

    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Rua xv', 22, '22311-22', 'Curitiba')
    
    customer.changeAddress(address)
    customer.actived()

    await customerRepository.create(customer)
      
    const customer2 = new Customer('1234', 'Customer 2')
    const address2 = new Address('Rua x', 8, '22545-98', 'Curitiba')
    
    customer2.changeAddress(address2)
    customer2.actived()

    await customerRepository.create(customer2)
  
    const foundCustomers = await customerRepository.findAll()

    const customers = [customer, customer2]

    expect(customers).toEqual(foundCustomers)
  })
})
