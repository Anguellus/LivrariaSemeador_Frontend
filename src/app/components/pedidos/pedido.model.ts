import { ProdutoPedido } from "./produtoPedido.model";

export interface Pedido {
    //? identifica que o atributo é opcional
    _id?: number
    idCliente: string
    idSessaoCobranca: string
    idPagamento: string
    produtos: ProdutoPedido[]
    dataPedido: Date
    dataEntrega?: Date
    status: string
    totalPedido: number
    formaPagamento: string
    statusPagamento: string
    linkPagamento: string
}