export default class OrderItem {
  private _id: string
  private _name: string
  private _productId: string
  private _price: number
  private _quantity: number

  constructor (id: string, name: string, productId: string, price: number, quantity: number) {
    this._id = id
    this._name = name
    this._productId = productId
    this._price = price
    this._quantity = quantity
    
    this.validate()
  }

  get id (): string {
    return this._id
  }

  get name (): string {
    return this._name
  }

  get quantity (): number {
    return this._quantity
  }

  get productId (): string {
    return this._productId
  }

  get price (): number {
    return this._price
  }

  get total (): number {
    return this._price * this._quantity
  }

  private validate (): void {
    if (this._id.length == 0) {
      throw Error('Id is required')
    }

    if(this._name.length == 0) {
      throw Error('Name is required')
    }

    if(this._productId.length == 0) {
      throw Error('Product id is required')
    }

    if(this._quantity <= 0) {
      throw Error('Quantity must be greater than 0')
    }
  }
}