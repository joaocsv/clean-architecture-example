import Product from '../entity/product'
import ProductService from './product.service'

describe('ProductService unit test', () => {
  test('Should change the prices of all products', () => {
    const product1 = new Product('12', 'Product 1', 20)
    const product2 = new Product('21', 'Product 2', 40)

    const products = [product1, product2]

    ProductService.increasePrice(products, 100)

    expect(product1.price).toBe(40)
    expect(product2.price).toBe(80)
  })
})