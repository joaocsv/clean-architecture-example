import Address from './entity/address'
import Customer from './entity/customer'
import Order from './entity/order'
import OrderItem from './entity/order-item'

let costumer = new Customer("123", "João")
let address = new Address("Rua nova era", 23, "21929-393", "New City")
costumer.address = address

let item1 = new OrderItem("444", "Item 1", 2.90)
let item2 = new OrderItem("232", "Item 2", 3.50)

const order = new Order("431", "123", [item1, item2])

