import Customer from '../../../domain/customer/entity/customer'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import { InputListCustomer, OutputListCustomer } from './list.customer.usecase.dto'

export default class ListCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute (input: InputListCustomer): Promise<OutputListCustomer> {
    const customers = await this.customerRepository.findAll()
    
    return OutputMapper.toOutput(customers)
  }
}

class OutputMapper {
  static toOutput (customers: Customer[]): OutputListCustomer {
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zip: customer.address.zip,
          city: customer.address.city
        }
      }))
    }
  }
}