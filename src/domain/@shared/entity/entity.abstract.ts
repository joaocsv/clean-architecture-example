import Notification from '../notification/notification'

export class Entity {
  protected _id: string
  protected _notification: Notification

  constructor() {
    this._notification = new Notification()
  }

  get notification (): Notification {
    return this._notification
  }
}