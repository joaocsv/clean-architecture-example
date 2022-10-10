export interface InputUpdateCustomerUseCase {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}

export interface OutputUpdateCustomerUseCase {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}