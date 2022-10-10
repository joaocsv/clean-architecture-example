import Address from '../../../domain/customer/value-object/address'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import { OutputCreateCustomer } from '../create/create.customer.dto'
import { InputUpdateCustomerUseCase } from './update.customer.usecase.dto'

export default class UpdateCustomerUseCase {
  private readonly customerRepository: CustomerRepository

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  async execute (input: InputUpdateCustomerUseCase): Promise<OutputCreateCustomer> {
    const customer = await this.customerRepository.find(input.id)

    customer.changeName(input.name)
    customer.changeAddress(
      new Address(
        input.address.street, 
        input.address.number, 
        input.address.zip, 
        input.address.city
      )
    )

    this.customerRepository.update(customer)

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