import ProductAbstract from './product.abstract'

export default class ProductB extends ProductAbstract {
  get price (): number {
    return this._price * 2
  }
}