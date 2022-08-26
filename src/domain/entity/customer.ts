import Address from './address'

export default class Customer {
  private _id: string
  private _name: string
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints = 0

  constructor (id: string, name: string) {
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

  set address (address: Address) {
    this._address = address
  }

  changeName (name: string): void {
    this._name = name

    this.validate()
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
    if (this._id.length == 0) {
      throw Error('Id is required')
    }

    if (this._name.length == 0) {
      throw Error('Name is required')
    }
  }
}