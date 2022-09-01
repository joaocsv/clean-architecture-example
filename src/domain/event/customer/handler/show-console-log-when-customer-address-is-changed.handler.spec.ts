import CustomerAddressChangedEvent from '../customer-address-changed.event'
import ShowConsoleLogWhenCustomerAddressIsChangedHandler from './show-console-log-when-customer-address-is-changed-.handler'

describe('ShowConsoleLogWhenCustomerAddressIsChanged unit testes', () => {
  test('Should show message when execute is called', () => {
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: '1',
      name: 'Joao',
      address: {
        city: 'São Paulo',
        street: 'Rua XV',
        number: 1234
      }
    })
    const showConsoleLogWhenCustomerAddressIsChangedHandler = new ShowConsoleLogWhenCustomerAddressIsChangedHandler()

    const consoleLogSpy = jest.spyOn(console, 'log')

    showConsoleLogWhenCustomerAddressIsChangedHandler.handle(customerAddressChangedEvent)

    expect(consoleLogSpy).toBeCalledWith('Endereço do cliente: 1, Joao alterado para: São Paulo - Rua XV - 1234')
  })
})