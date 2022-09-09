import OrderFactory from './order.factory'

describe('OrderFactory unit test', () => {
  test('Should create an order', () => {
    const order = OrderFactory.create({
      customerId: 'any_id',
      items: [
        {
          name: 'Item 1',
          productId: 'productId1',
          price: 2.90,
          quantity: 2
        },
        {
          name: 'Item 2',
          productId: 'productId2',
          price: 4.27,
          quantity: 3
        }
      ]
    })

    expect(order.id).toBeDefined()
    expect(order.items.length).toBe(2)
  })
})