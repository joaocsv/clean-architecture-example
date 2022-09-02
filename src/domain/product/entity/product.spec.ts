import Product from './product'

describe('Product unit test', () => {
  test('Should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'Name', 20.39)
    }).toThrowError('Id is required')
  })

  test('Should throw error when name is empty', () => {
    expect(() => {
      new Product('200', '', 20.39)
    }).toThrowError('Name is required')
  })

  test('Should throw error when price is less than zero', () => {
    expect(() => {
      new Product('200', 'Name', 0)
    }).toThrowError('Price must be greater than zero')
  })

  test('Should change name', () => {
    const product = new Product('200', 'Coca-Cola', 2.90)

    expect(product.name).toBe('Coca-Cola')

    product.changeName('Arroz')

    expect(product.name).toBe('Arroz')
  })

  test('Should change price', () => {
    const product = new Product('200', 'Coca-Cola', 2.90)

    expect(product.price).toBe(2.90)

    product.changePrice(14.60)

    expect(product.price).toBe(14.60)
  })

  
})