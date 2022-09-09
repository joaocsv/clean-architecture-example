import Address from '../value-object/address'
import CustomerFactory from './customer.factory'

describe('CustomerFactory unit test', () => {
  test('Should create an customer', () => {
    const customer = CustomerFactory.create('João')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('João')
    expect(customer.address).toBeUndefined()
  })

  test('Should create an customer with address', () => {
    const address = new Address('Rua XV', 200, '22222-22', 'Colombo')
    const customer = CustomerFactory.createWithAddress('João', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('João')
    expect(customer.address).toBe(address)
  })
})