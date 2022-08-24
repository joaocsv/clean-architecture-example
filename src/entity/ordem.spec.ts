import Ordem from './ordem'
import OrdemItem from './ordem-item'

describe('Ordem unit tests', () => {
  test('Should throw error when id is empty', () => {
    
    expect(() => {
      const ordem = new Ordem ('', '121', [])
    }).toThrowError('Id is required')
  })

  test('Should throw error when customerId is empty', () => {
    
    expect(() => {
      const ordem = new Ordem ('212', '', [])
    }).toThrowError('CustomerId is required')
  })

  test('Should throw error when items is empty', () => {
    expect(() => {
      const ordem = new Ordem ('212', '232', [])
    }).toThrowError('Items are required')
  })

  test('Should calculate total', () => {
    const item = new OrdemItem('123', 'item 1', 100)
    const item2 = new OrdemItem('321', 'item 2', 200)

    const ordem = new Ordem('321', '232', [item])

    expect(ordem.total).toBe(100)

    const ordem2 = new Ordem ('321', '355', [item, item2])

    expect(ordem2.total).toBe(300)
  })
})