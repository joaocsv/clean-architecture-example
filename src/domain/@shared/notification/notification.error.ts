import { NotificationErrorProp } from './notification'

export default class NotificationError extends Error {
  private readonly _errors: NotificationErrorProp[]

  constructor (errors: NotificationErrorProp[]) {
    super(
      errors.map((error) => `${error.context}: ${error.message}`).join(', ')
    )

    this._errors = errors
  }

  get errors (): NotificationErrorProp[] {
    return this._errors
  }
}