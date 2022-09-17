export interface ProdutoPedido {
    //? identifica que o atributo é opcional
    _id: number
    idCobranca: string
    nome: string
    quantidade: number
    preco: number
    totalProduto: number
}