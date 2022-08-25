import Order from '../entity/order'

export default class OrderService {
  static total (orders: Order[]): number {
    return orders.reduce((sum, item) => sum + item.total, 0)
  }
}