export interface InputListCustomer {}

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

export interface OutputListCustomer {
  customers: Customer[]
}