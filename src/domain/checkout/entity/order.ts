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
    
    this.calculateTotal()
    this.validate()
  }

  get id (): string {
    return this._id
  }

  get customerId (): string {
    return this._customerId
  }

  get items (): OrderItem[] {
    return this._items
  }

  get total (): number {
    return this._total
  }

  private calculateTotal (): void {
    this._total = this._items.reduce((sum, item) => sum + item.total, 0)
  }

  changeItems (items: OrderItem[]): void {
    this._items = items

    this.validate()
    this.calculateTotal()
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