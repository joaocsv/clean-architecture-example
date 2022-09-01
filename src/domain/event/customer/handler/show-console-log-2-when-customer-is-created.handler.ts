import EventHandlerInterface from '../../@shared/event-handler.interface'
import CustomerCreatedEvent from '../customer-created.event'

export default class ShowConsoleLog2WhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: ' + event.constructor.name)
  }
}