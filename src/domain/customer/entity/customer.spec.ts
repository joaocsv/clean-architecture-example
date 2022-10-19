import Address from '../value-object/address'
import Customer from './customer'

describe('Customer unit tests', () => {
  test('Should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'João')
    }).toThrowError('customer: Id is required')
  })

  test('Should throw error when name is empty', () => {
    expect(() => {
      const customer = new Customer('123', '')
    }).toThrowError('customer: Name is required')
  })

  test('Should throw error when id and name are empty', () => {
    expect(() => {
      const customer = new Customer('', '')
    }).toThrowError('customer: Id is required, customer: Name is required')
  })

  test('Should change name', () => {
    const customer = new Customer('124', 'João')

    expect(customer.name).toBe('João')

    customer.changeName('Rodolfo')

    expect(customer.name).toBe('Rodolfo')
  })

  test('Should activate customer', () => {
    const customer = new Customer('124', 'João')
    const address = new Address("Rua mercosul", 232, "23942-322", "São Paulo")
    customer.changeAddress(address)

    expect(customer.isActive).toBe(false)

    customer.actived()

    expect(customer.isActive).toBe(true)
  })

  test('Should throw error when address is undefined when you activate a customer', () => {
    const costumer = new Customer("123", "João")
    
    expect(() => {
      costumer.actived()
    }).toThrowError('To active a customer, the address is required')
  })

  test('Should deactivate customer', () => {
    const customer = new Customer('124', 'João')
    const address = new Address("Rua mercosul", 232, "23942-322", "São Paulo")
    customer.changeAddress(address)

    customer.actived()
    
    expect(customer.isActive).toBe(true)
    
    customer.deactived()
    
    expect(customer.isActive).toBe(false)
  })

  test('Should add rewards points', () => {
    const customer = new Customer('2', 'João')
    
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)

    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(5)

    expect(customer.rewardPoints).toBe(15)
  })
})