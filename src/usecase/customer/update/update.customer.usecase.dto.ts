export interface InputUpdateCustomer {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}

export interface OutputUpdateCustomer {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}