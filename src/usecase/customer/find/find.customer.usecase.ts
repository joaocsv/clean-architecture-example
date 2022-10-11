import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import { InputFindCustomer, OutputFindCustomer } from './find.customer.dto'

export default class FindCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute (input: InputFindCustomer): Promise<OutputFindCustomer> {
    const customer = await this.customerRepository.find(input.id)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        zip: customer.address.zip,
        number: customer.address.number,
        street: customer.address.street,
        city: customer.address.city
      }
    }
  }
}