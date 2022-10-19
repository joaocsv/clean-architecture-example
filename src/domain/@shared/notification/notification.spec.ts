import Notification from './notification'

describe('Unit tests for notification', () => {
  test('should create errors', () => {
    const notification = new Notification()

    const error = {
      message: 'Error message',
      context: 'customer'
    }

    notification.addError(error)

    expect(notification.messages('customer')).toBe('customer: Error message')

    const error2 = {
      message: 'Error message2',
      context: 'customer'
    }

    notification.addError(error2)

    expect(notification.messages('customer')).toBe('customer: Error message, customer: Error message2')

    const error3 = {
      message: 'Error message3',
      context: 'order'
    }

    notification.addError(error3)

    expect(notification.messages('customer')).toBe('customer: Error message, customer: Error message2')
    
    expect(notification.messages()).toBe('customer: Error message, customer: Error message2, order: Error message3')
  })

  test('should check if notification has at least one error', () => {
    const notification = new Notification()

    const error = {
      message: 'Error message',
      context: 'customer'
    }

    notification.addError(error)

    expect(notification.hasError()).toBe(true)
  })

  test('should get all errors props', () => {
    const notification = new Notification()

    const error = {
      context: 'customer',
      message: 'Error message'
    }

    notification.addError(error)

    expect(notification.errors).toEqual([error])
  })

  test('should clear all errors', () => {
    const notification = new Notification()

    const error = {
      context: 'customer',
      message: 'Error message'
    }

    notification.addError(error)

    expect(notification.errors).toEqual([error])

    notification.clearErrors()

    expect(notification.errors).toEqual([])
  })
})