import ProductB from './product-b'

describe('ProductB unit test', () => {
  test('Should return correct price', () => {
    const product = new ProductB('123', 'Product test', 20)

    expect(product.price).toBe(40)

    product.changePrice(25)

    expect(product.price).toBe(50)
  })
})