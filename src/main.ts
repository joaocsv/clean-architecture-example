let costumer = new Customer("123", "João")
let address = new Address("Rua nova era", 23, "21929-393", "New City")
costumer.address = address

let item1 = new OrdemItem("444", "Item 1", 2.90)
let item2 = new OrdemItem("232", "Item 2", 3.50)

const ordem = new Ordem("431", "123", [item1, item2])

