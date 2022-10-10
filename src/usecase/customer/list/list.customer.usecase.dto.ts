export interface InputListCustomerUseCase {}

type Customer = {
  id: string
  name: string
  address: {
    street: string
    zip: string
    number: number
    city: string
  }
}

export interface OutputListCustomerUseCase {
  customers: Customer[]
}