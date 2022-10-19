import Product from '../entity/product'
import RepositoryInterface from '../../@shared/repository/repository-interface'
import ProductInterface from '../entity/product.abstract'

export default interface ProductRepositoryInterface extends RepositoryInterface<ProductInterface> {}