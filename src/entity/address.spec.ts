import Address from './address'

describe('Address unit tests', () => {
  test('Should throw when street is empty', () => {
    expect(() => {
      const address = new Address('', 22, '32922-232', 'São Paulo')
    }).toThrowError('Street is required')
  })

  test('Should throw when number is less than zero', () => {
    expect(() => {
      const address = new Address('Rua Sul', 0, '32922-232', 'São Paulo')
    }).toThrowError('Number is required')
  })

  test('Should throw when zip code is empty', () => {
    expect(() => {
      const address = new Address('Rua Sul', 22, '', 'São Paulo')
    }).toThrowError('Zip Code is required')
  })

  test('Should throw when city is empty', () => {
    expect(() => {
      const address = new Address('Rua Sul', 22, '22222-222', '')
    }).toThrowError('City is required')
  })
})