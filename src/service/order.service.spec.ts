import Customer from '../entity/customer'
import Order from '../entity/order'
import OrderItem from '../entity/order-item'
import OrderService from './order.service'

describe('OrderService unit test', () => {
  test('Should place an order', () => {
    const customer = new Customer('2', 'Gonçales')
    const item = new OrderItem('1', 'item 1', 'p1', 20, 2)
    
    const order = OrderService.placeOrder(customer, [item])

    expect(customer.rewardPoints).toBe(20)
    expect(order.total).toBe(40)
  })
  
  test('Should get total of all orders', () => {
    const item1 = new OrderItem('1', 'item 1', 'p1', 20, 2)
    const item2 = new OrderItem('2', 'item 2', 'p2', 50, 3)

    const order = new Order('1', 'c1', [item1])
    const order2 = new Order('2', 'c1', [item2])

    const total = OrderService.total([order, order2])

    expect(total).toBe(190)
  })
})