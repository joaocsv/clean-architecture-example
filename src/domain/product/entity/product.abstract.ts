import { Entity } from '../../@shared/entity/entity.abstract'
import NotificationError from '../../@shared/notification/notification.error'
import { ProductValidatorFactory } from '../factory/product.validator.factory'

export default class ProductAbstract extends Entity {
  protected _name: string
  protected _price: number

  constructor (id: string, name: string, price: number) {
    super()

    this._id = id
    this._name = name
    this._price = price

    this.validate()
  }

  get id (): string {
    return this._id
  }

  get name (): string {
    return this._name
  }

  get price (): number {
    return this._price
  }

  changeName (name: string): void {
    this._name = name

    this.validate()
  }

  changePrice (price: number): void {
    this._price = price

    this.validate()
  }

  private validate (): void {
    this._notification.clearErrors()
    
    ProductValidatorFactory.create().validate(this)

    if(this._notification.hasError()) {
      throw new NotificationError(this._notification.errors)
    }
  }
}
