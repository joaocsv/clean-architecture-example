import CustomerCreatedEvent from '../customer-created.event'
import ShowConsoleLog2WhenCustomerIsCreatedHandler from './show-console-log-2-when-customer-is-created.handler'

describe('ShowConsoleLog2WhenCustomerIsCreatedHandler unit testes', () => {
  test('Should show message when execute is called', () => {
    const customerCreatedEvent = new CustomerCreatedEvent({})
    const showConsoleLog2WhenCustomerIsCreatedHandler = new ShowConsoleLog2WhenCustomerIsCreatedHandler()

    const consoleLogSpy = jest.spyOn(console, 'log')

    showConsoleLog2WhenCustomerIsCreatedHandler.handle(customerCreatedEvent)

    expect(consoleLogSpy).toBeCalledWith('Esse é o segundo console.log do evento: CustomerCreatedEvent')
  })
})