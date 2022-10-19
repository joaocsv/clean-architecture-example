import Product from './product'

describe('Product unit test', () => {
  test('Should return correct price', () => {
    const product = new Product('123', 'Product test', 20)

    expect(product.price).toBe(20)

    product.changePrice(25)

    expect(product.price).toBe(25)
  })
})