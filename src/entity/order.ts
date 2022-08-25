import OrderItem from './order-item'

export default class Order {
  private _id: string
  private _customerId: string
  private _items: OrderItem[]
  private _total: number

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this._total = this.calculateTotal()

    this.validate()
  }

  get total (): number {
    return this._total
  }

  private calculateTotal (): number {
    return this._items.reduce((sum, item) => sum + item._price, 0)
  }

  private validate () {
    if (this._id.length === 0) {
      throw Error('Id is required')
    }

    if (this._customerId.length === 0) {
      throw Error('CustomerId is required')
    }

    if (this._items.length === 0) {
      throw Error('Items are required')
    }
  }
}