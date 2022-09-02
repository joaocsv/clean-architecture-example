import Address from '../../../../domain/customer/value-object/address'
import Customer from '../../../../domain/customer/entity/customer'
import Product from '../../../../domain/product/entity/product'
import OrderItem from '../../../../domain/checkout/entity/order-item'
import Order from '../../../../domain/checkout/entity/order'
import CustomerModel from '../../../customer/repository/sequelize/model/customer.model'
import ProductModel from '../../../product/repository/sequelize/model/product.model'
import OrderItemModel from './model/order-item.model'
import OrderRepository from './order.repository'
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository'
import ProductRepository from '../../../product/repository/sequelize/product.repository'


import OrderModel from './model/order.model'

import { Sequelize } from 'sequelize-typescript'

describe('Customer unit tests', () => {
  let sequelize: Sequelize
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ CustomerModel, ProductModel, OrderModel, OrderItemModel ])
    
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('Should create a order', async () => {
    const customer = new Customer('2222', 'Customer 1')
    const address = new Address('Rua xv', 222, '12222-22', 'Curitiba')
    customer.changeAddress(address)
    customer.actived()

    const custumerRepository = new CustomerRepository()
    await custumerRepository.create(customer)
  
    const product = new Product('1222', 'Product 1', 9.20)
    const productRepository = new ProductRepository()
    await productRepository.create(product)

    const orderItem = new OrderItem('2313', product.name, product.id, product.price, 2)

    const order = new Order('2232', customer.id, [ orderItem ])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderCreated = await OrderModel.findOne({ where: { id: order.id }, include: ['items']})

    expect(orderCreated?.toJSON()).toStrictEqual({
      id: '2232',
      customer_id: '2222',
      total: order.total,
      items: [
        {
          id: '2313',
          name: 'Product 1',
          price: 9.20,
          quantity: 2,
          order_id: '2232',
          product_id: '1222'
        }
      ]
    })
  })

  test('Should update a order', async () => {
    const customer = new Customer('2222', 'Customer 1')
    const address = new Address('Rua xv', 222, '12222-22', 'Curitiba')
    customer.changeAddress(address)
    customer.actived()

    const custumerRepository = new CustomerRepository()
    await custumerRepository.create(customer)
  
    const product = new Product('1222', 'Product 1', 9.20)
    const productRepository = new ProductRepository()
    await productRepository.create(product)

    const orderItem = new OrderItem('2313', product.name, product.id, product.price, 2)

    const order = new Order('2232', customer.id, [ orderItem ])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderCreated = await OrderModel.findOne({ where: { id: order.id }, include: ['items']})

    expect(orderCreated?.toJSON()).toStrictEqual({
      id: '2232',
      customer_id: '2222',
      total: order.total,
      items: [
        {
          id: '2313',
          name: 'Product 1',
          price: 9.20,
          quantity: 2,
          order_id: '2232',
          product_id: '1222'
        }
      ]
    })

    const product2 = new Product('2321', 'Product 2', 2.00)
    await productRepository.create(product2)

    const orderItem2 = new OrderItem('2422', product2.name, product2.id, product2.price, 3)

    order.changeItems([orderItem2])

    await orderRepository.update(order)

    const orderUpdate = await OrderModel.findOne({ where: { id: order.id }, include: ['items']})

    expect(orderUpdate?.toJSON()).toStrictEqual({
      id: '2232',
      customer_id: '2222',
      total: order.total,
      items: [
        {
          id: '2422',
          name: 'Product 2',
          price: 2.00,
          quantity: 3,
          order_id: '2232',
          product_id: '2321'
        }
      ]
    })
  })

  test('Should throw when order is empty', async () => {
    const orderRepository = new OrderRepository()
    const findPromise = orderRepository.find('2232')

    expect(findPromise).rejects.toThrowError('Order not found')
  })

  test('Should find a order', async () => {
    const customer = new Customer('2222', 'Customer 1')
    const address = new Address('Rua xv', 222, '12222-22', 'Curitiba')
    customer.changeAddress(address)
    customer.actived()

    const custumerRepository = new CustomerRepository()
    await custumerRepository.create(customer)
  
    const product = new Product('1222', 'Product 1', 9.20)
    const productRepository = new ProductRepository()
    await productRepository.create(product)

    const orderItem = new OrderItem('2313', product.name, product.id, product.price, 2)

    const order = new Order('2232', customer.id, [ orderItem ])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderCreated = await OrderModel.findOne({ where: { id: order.id }, include: ['items']})

    const orderFounded = await orderRepository.find('2232')

    expect(orderCreated?.toJSON()).toStrictEqual({
      id: orderFounded.id,
      customer_id: orderFounded.customerId,
      total: orderFounded.total,
      items: orderFounded.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId,
        order_id: orderFounded.id
      }))
    })
  })

  test('Should find all orders', async () => {
    const customer = new Customer('2222', 'Customer 1')
    const address = new Address('Rua xv', 222, '12222-22', 'Curitiba')
    customer.changeAddress(address)
    customer.actived()

    const custumerRepository = new CustomerRepository()
    await custumerRepository.create(customer)
  
    const product = new Product('1222', 'Product 1', 9.20)
    const productRepository = new ProductRepository()
    await productRepository.create(product)

    const orderRepository = new OrderRepository()

    const orderItem = new OrderItem('2313', product.name, product.id, product.price, 2)
    const order = new Order('2232', customer.id, [ orderItem ])

    await orderRepository.create(order)

    const orderItem2 = new OrderItem('9999', product.name, product.id, product.price, 2)
    const order2 = new Order('2222', customer.id, [ orderItem2 ])

    await orderRepository.create(order2)

    const orders = [ order, order2 ]

    const ordersFounded = await orderRepository.findAll()

    expect(orders).toEqual(ordersFounded)
  })
})