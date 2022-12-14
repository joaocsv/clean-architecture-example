import { Entity } from '../../@shared/entity/entity.abstract'
import NotificationError from '../../@shared/notification/notification.error'
import { CustomerValidatorFactory } from '../factory/customer.validator.factory'
import Address from '../value-object/address'

export default class Customer extends Entity {
  private _name: string
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor (id: string, name: string) {
    super()

    this._id = id
    this._name = name

    this.validate()
  }

  get id (): string {
    return this._id
  }

  get name (): string {
    return this._name
  }

  get isActive (): boolean {
    return this._active
  }

  get rewardPoints () {
    return this._rewardPoints
  }

  get address () {
    return this._address
  }

  changeName (name: string): void {
    this._name = name

    this.validate()
  }

  changeAddress (address: Address) {
    this._address = address
  }

  actived (): void {
    if (this._address == undefined) {
      throw new Error("To active a customer, the address is required")
    }

    this._active = true
  }

  deactived (): void {
    this._active = false
  }

  addRewardPoints (points: number) {
    this._rewardPoints += points
  }

  private validate (): void {
    this._notification.clearErrors()

    CustomerValidatorFactory.create().validate(this)

    if (this._notification.hasError()) {
      throw new NotificationError(this._notification.errors)
    }
  }
}