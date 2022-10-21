import { OutputListCustomer } from '../../../usecase/customer/list/list.customer.usecase.dto'

import { toXML, XmlOptions } from 'jstoxml'

export default class CustomerPresenter {
  static listToXML(data: OutputListCustomer): string {
    const xmlOption: XmlOptions = {
      header: true,
      indent: ' '
    }

    return toXML({
      customers: {
        customer: data.customers.map(customer => ({
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.address.street,
            number: customer.address.number,
            zip: customer.address.zip,
            city: customer.address.city
          }
        }))
      }
    }, xmlOption)
  }
}