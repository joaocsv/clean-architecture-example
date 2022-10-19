import ProductAbstract from './product.abstract'

class ProductAbstractTest extends ProductAbstract {}

describe('Product Abstract unit test', () => {
  test('Should throw error when id is empty', () => {
    expect(() => {
      new ProductAbstractTest('', 'Name', 20.39)
    }).toThrowError('product: Id is required')
  })

  test('Should throw error when name is empty', () => {
    expect(() => {
      new ProductAbstractTest('2323', '', 20.39)
    }).toThrowError('product: Name is required')
  })

  test('Should throw error when price is less than zero', () => {
    expect(() => {
      new ProductAbstractTest('4233', 'Name', 0)
    }).toThrowError('product: Price must be greater than zero')
  })

  test('Should throw error when name is empty and price is less than zero', () => {
    expect(() => {
      new ProductAbstractTest('200', '', 0)
    }).toThrowError('product: Name is required, product: Price must be greater than zero')
  })

  test('Should change name', () => {
    const product = new ProductAbstractTest('200', 'Coca-Cola', 2.90)

    expect(product.name).toBe('Coca-Cola')

    product.changeName('Arroz')

    expect(product.name).toBe('Arroz')
  })

  test('Should change price', () => {
    const product = new ProductAbstractTest('200', 'Coca-Cola', 2.90)

    expect(product.price).toBe(2.90)

    product.changePrice(14.60)

    expect(product.price).toBe(14.60)
  })

  
})