import Address from './address'

export default class Customer {
  private _id: string
  private _name: string
  private _address!: Address
  private _active: boolean = false

  constructor (id: string, name: string) {
    this._id = id
    this._name = name

    this.validate()
  }

  get name (): string {
    return this._name
  }

  get isActive (): boolean {
    return this._active
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

  set address (address: Address) {
    this._address = address
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