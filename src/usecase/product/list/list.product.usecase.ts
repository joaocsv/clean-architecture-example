import ProductInterface from '../../../domain/product/entity/product.abstract'
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { InputListProduct, OutputListProduct } from './list.product.dto'

export default class ListProductUseCase {
  private readonly productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute (input: InputListProduct): Promise<OutputListProduct> {
    const products = await this.productRepository.findAll()

    return OutputMapper.toOutput(products)
  }
}

class OutputMapper {
  static toOutput (products: ProductInterface[]): OutputListProduct {
    return {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }
  }
}

