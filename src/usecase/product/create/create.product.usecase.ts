import ProductFactory from '../../../domain/product/factory/product.factory'
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { InputCreateProduct, OutputCreateProduct } from './create.product.dto'

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute (input: InputCreateProduct): Promise<OutputCreateProduct> {
    const product = ProductFactory.create('a',  input.name, input.price)

    this.productRepository.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}