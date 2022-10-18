type NotificationError = {
  message: string,
  context: string
}

export default class Notification {
  private readonly errors: NotificationError[] = []

  addError(error: NotificationError): void {
    this.errors.push(error)
  }

  messages (context?: string): string {
    return this.errors
      .filter((error) => context == undefined || context == error.context)
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ')
  }
}