import Order from '../entity/order'
import OrderItem from '../entity/order-item'

import { v4 as uuid } from 'uuid'

export default class OrderFactory {
  static create (params: OrderFactoryParams) {
    const items = params.items.map(item => {
      return new OrderItem(uuid(), item.name, item.productId, item.price, item.quantity)
    })

    const order = new Order(uuid(), params.customerId, items)
    
    return order
  }
}

interface OrderFactoryParams {
  customerId: string
  items: {
    name: string
    productId: string
    price: number,
    quantity: number
  }[]
}