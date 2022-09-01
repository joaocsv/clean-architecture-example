import CustomerCreatedEvent from '../customer-created.event'
import ShowConsoleLog1WhenCustomerIsCreatedHandler from './show-console-log-1-when-customer-is-created.handler'

describe('ShowConsoleLog1WhenCustomerIsCreatedHandler unit testes', () => {
  test('Should show message when execute is called', () => {
    const customerCreatedEvent = new CustomerCreatedEvent({})
    const showConsoleLog1WhenCustomerIsCreatedHandler = new ShowConsoleLog1WhenCustomerIsCreatedHandler()

    const consoleLogSpy = jest.spyOn(console, 'log')

    showConsoleLog1WhenCustomerIsCreatedHandler.handle(customerCreatedEvent)

    expect(consoleLogSpy).toBeCalledWith('Esse é o primeiro console.log do evento: CustomerCreatedEvent')
  })
})