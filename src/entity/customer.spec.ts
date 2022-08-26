import Address from './address'
import Customer from './customer'

describe('Customer unit tests', () => {
  test('Should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'João')
    }).toThrowError('Id is required')
  })

  test('Should throw error when name is empty', () => {
    expect(() => {
      const customer = new Customer('123', '')
    }).toThrowError('Name is required')
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
    customer.address = address

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
    customer.address = address

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