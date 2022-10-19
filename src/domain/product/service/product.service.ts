import ProductAbstract from '../entity/product.abstract'

export default class ProductService {
  static increasePrice (products: ProductAbstract[], percentage: number): void {
    products.forEach(product => product.changePrice((product.price * percentage) / 100 + product.price));
  }
}