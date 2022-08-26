import OrderItem from './order-item'

describe('OrderItem unit tests', () => {
  test('Should throw when id is empty', () => {
    expect (() => {
      new OrderItem('', 'Item 1', '232', 22.23, 1)
    }).toThrowError('Id is required')
  })

  test('Should throw when name is empty', () => {
    expect (() => {
      new OrderItem('232', '', '232', 22.23, 1)
    }).toThrowError('Name is required')
  })

  test('Should throw when productId is empty', () => {
    expect (() => {
      new OrderItem('232', 'Item 1', '', 22.23, 2)
    }).toThrowError('Product id is required')
  })

  test('Should throw when quantity is less or equal zero', () => {
    expect (() => {
      new OrderItem('232', 'Item 1', '232', 22.23, 0)
    }).toThrowError('Quantity must be greater than 0')
  })
})