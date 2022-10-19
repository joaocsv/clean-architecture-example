export type NotificationErrorProp = {
  message: string,
  context: string
}

export default class Notification {
  private _errors: NotificationErrorProp[] = []

  addError(error: NotificationErrorProp): void {
    this._errors.push(error)
  }

  clearErrors (): void {
    this._errors = []
  }

  messages (context?: string): string {
    return this._errors
      .filter((error) => context == undefined || context == error.context)
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ')
  }

  hasError(): boolean {
    return this._errors.length > 0
  }

  get errors (): NotificationErrorProp[] {
    return this._errors
  }
}