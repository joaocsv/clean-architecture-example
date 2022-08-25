import Order from './order'
import OrderItem from './order-item'

describe('Order unit tests', () => {
  test('Should throw error when id is empty', () => {
    
    expect(() => {
      new Order ('', '121', [])
    }).toThrowError('Id is required')
  })

  test('Should throw error when customerId is empty', () => {
    
    expect(() => {
      new Order ('212', '', [])
    }).toThrowError('CustomerId is required')
  })

  test('Should throw error when items is empty', () => {
    expect(() => {
      new Order ('212', '232', [])
    }).toThrowError('Items are required')
  })

  test('Should calculate total', () => {
    const item = new OrderItem('123', 'item 1', '232', 100, 2)
    const item2 = new OrderItem('321', 'item 2', '232', 200, 3)

    const order = new Order('321', '232', [item])

    expect(order.total).toBe(200)

    const order2 = new Order ('321', '355', [item, item2])

    expect(order2.total).toBe(800)
  })
})