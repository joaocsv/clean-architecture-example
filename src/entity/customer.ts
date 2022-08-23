class Customer {
  _id: string
  _name: string
  _address!: Address
  _active: boolean = false

  constructor (id: string, name: string) {
    this._id = id
    this._name = name
  }

  changeName (name: string): void {
    this._name = name

    if(name.length == 0) {
      throw new Error("Name is required")
    }
  }

  actived (): void {
    this._active = true
  }

  deactived (): void {
    if (this._address == undefined) {
      throw new Error("Address is required")
    }
  
    this._active = true
  }

  set address (address: Address) {
    this._address = address
  }
}