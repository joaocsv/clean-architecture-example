import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import { InputFindProduct, OutputFindProduct } from './find.product.dto'

export default class FindProductUseCase {
  private productReposity: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productReposity = productRepository
  }

  async execute (input: InputFindProduct): Promise<OutputFindProduct> {
    const product = await this.productReposity.find(input.id)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}