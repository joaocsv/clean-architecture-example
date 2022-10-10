import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import Address from '../../../domain/customer/value-object/address'
import { InputCreateCustomer, OutputCreateCustomer } from './create.customer.dto'

export default class CreateCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute (input: InputCreateCustomer): Promise<OutputCreateCustomer> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    )

    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip
      }
    }
  }
}