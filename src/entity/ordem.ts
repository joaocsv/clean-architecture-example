class Ordem {
  _id: string
  _customerId: string
  _items: OrdemItem[]

  constructor(id: string, customerId: string, items: OrdemItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
  }
}