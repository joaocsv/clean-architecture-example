import ProductFactory from './product.factory'

describe('ProductFactory unit test', () => {
  test('Should create a product', () => {
     const product = ProductFactory.create('a', 'Product A', 2.90)

     expect(product.name).toBe('Product A')
     expect(product.price).toBe(2.90)
     expect(product.constructor.name).toBe('Product')
  })

  test('Should create a product of type b', () => {
    const product = ProductFactory.create('b', 'Product B', 4.20)

    expect(product.name).toBe('Product B')
    expect(product.price).toBe(8.40)
    expect(product.constructor.name).toBe('ProductB')
 })

 test('Should throw an error when product type is not supported', () => {
    expect(() => ProductFactory.create('c', 'Product C', 20)).toThrowError('product type not supported')
 })
})