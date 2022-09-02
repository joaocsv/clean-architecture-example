import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface'
import OrderModel from './model/order.model'
import OrderItemModel from './model/order-item.model'
import Order from '../../../../domain/checkout/entity/order'
import OrderItem from '../../../../domain/checkout/entity/order-item'



export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total,
      items: entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId
      }))
    }, {
      include: [{ model: OrderItemModel }]
    })
  }

  async update(entity: Order): Promise<void> {
    await OrderItemModel.destroy({
      where: { order_id: entity.id }
    })

    await OrderItemModel.bulkCreate(entity.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      product_id: item.productId,
      order_id: entity.id
    })))

    await OrderModel.update({
      customer_id: entity.customerId,
      total: entity.total,
    }, {
      where: {
        id: entity.id
      }
    })
  }

  async find(id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({
        where: { id: id },
        include: { model: OrderItemModel },
        rejectOnEmpty: true
      })

      const items = orderModel.items.map(orderItemModel => {
        return new OrderItem(orderItemModel.id, orderItemModel.name, orderItemModel.product_id, orderItemModel.price, orderItemModel.quantity)
      })
  
      const order = new Order(orderModel.id, orderModel.customer_id, items)
  
      return order
    } catch {
      throw new Error('Order not found')
    }
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({
      include: [{ model: OrderItemModel }]
    })
    
    return ordersModel.map(orderModel => {
      const items = orderModel.items.map(orderItemModel => {
        return new OrderItem(orderItemModel.id, orderItemModel.name, orderItemModel.product_id, orderItemModel.price, orderItemModel.quantity)
      })

      return new Order(orderModel.id, orderModel.customer_id, items)
    })
  }
}