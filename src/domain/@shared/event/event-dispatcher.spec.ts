import EventDispatcher from './event-dispatcher'
import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/send-email-when-product-is-created.handler'
import ProductCreatedEvent from '../../product/event/product-created.event'

describe('Domain events tests', () => {
  it('Should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.eventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
  })

  it('Should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'].length).toBe(0)
  })

  it('Should notify all events handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    const handleSpy = jest.spyOn(eventHandler, 'handle')

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.eventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10.0
    })

    eventDispatcher.notify(productCreatedEvent)
    
    expect(handleSpy).toHaveBeenCalled()
  })
})