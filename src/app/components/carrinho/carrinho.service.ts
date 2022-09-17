import { Injectable } from '@angular/core';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { Pedido } from '../pedidos/pedido.model';
import { ProdutoPedido } from '../pedidos/produtoPedido.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  // produto de teste
  prodPed: ProdutoPedido ={
    _id: 123,
    idCobranca: '',
    nome: 'Teste',
    preco: 12.00,
    quantidade: 3,
    totalProduto: 36
  }

  carrinhoData: Pedido = ({
    idCliente: '',
    idSessaoCobranca: '',
    idPagamento: '',
    produtos: [],
    dataPedido: new Date(),
    status: 'pendente',
    totalPedido: 0,
    formaPagamento: '',
    statusPagamento: '',
    linkPagamento: ''
  })

  fotos: string[] = []

  constructor(private snackBar: MatSnackBar, private headerSrv: HeaderService) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 1000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  incluirItem(item: ProdutoPedido) {
    let encontrado: boolean = false
    if (this.carrinhoData.produtos.length == 0) {
      this.carrinhoData.status = "em andamento"
      this.carrinhoData.idCliente = this.headerSrv.headerData.id
      this.carrinhoData.dataPedido = new Date()
      item.quantidade = 1
      item.totalProduto = item.quantidade * item.preco
      this.carrinhoData.produtos.push(item)
      this.headerSrv.headerData.itensCarrinho = 1
      encontrado = true
    } else {
      for (let index = 0; index < this.carrinhoData.produtos.length; index++) {
        if (item._id == this.carrinhoData.produtos[index]._id) {
          this.carrinhoData.produtos[index].quantidade += 1
          this.carrinhoData.produtos[index].totalProduto = this.carrinhoData.produtos[index].quantidade * this.carrinhoData.produtos[index].preco
          this.headerSrv.headerData.itensCarrinho += 1
          encontrado = true
        }
      }
      if (!encontrado) {
        item.quantidade = 1
        item.totalProduto = item.quantidade * item.preco
        this.carrinhoData.produtos.push(item)
        this.headerSrv.headerData.itensCarrinho += 1
      }
    }
    var valorTemp = 0
    for (let index = 0; index < this.carrinhoData.produtos.length; index++) {
      valorTemp += this.carrinhoData.produtos[index].totalProduto
    }
    this.carrinhoData.totalPedido = valorTemp
  }

  removerItem(idProduto: number) {
    for (let index = 0; index < this.carrinhoData.produtos.length; index++) {
      console.log("REMOVER ITEM PROD: " + idProduto)
      console.log("REMOVER ITEM INDEX: " + this.carrinhoData.produtos[index]._id)
      if (idProduto == this.carrinhoData.produtos[index]._id) {
        this.headerSrv.headerData.itensCarrinho = this.headerSrv.headerData.itensCarrinho - this.carrinhoData.produtos[index].quantidade
        this.carrinhoData.totalPedido -= this.carrinhoData.produtos[index].totalProduto
        this.carrinhoData.produtos.splice(index, 1)
      }
    }
  }

  diminuirQtd(idProduto: number) {
    for (let index = 0; index < this.carrinhoData.produtos.length; index++) {
      if (idProduto == this.carrinhoData.produtos[index]._id) {
        if (this.carrinhoData.produtos[index].quantidade == 1) {
          this.carrinhoData.totalPedido -= this.carrinhoData.produtos[index].totalProduto
          this.carrinhoData.produtos.splice(index, 1)
        } else {
          this.carrinhoData.totalPedido -= this.carrinhoData.produtos[index].preco
          this.carrinhoData.produtos[index].quantidade -= 1
        }
      }
    }
    this.headerSrv.headerData.itensCarrinho -= 1
  }

  aumentarQtd(idProduto: number) {
    //implementar ainda
    for (let index = 0; index < this.carrinhoData.produtos.length; index++) {
      if (idProduto == this.carrinhoData.produtos[index]._id) {
        this.carrinhoData.totalPedido += this.carrinhoData.produtos[index].preco
        this.carrinhoData.produtos[index].quantidade += 1
      }
    }
    this.headerSrv.headerData.itensCarrinho += 1
  }

  limparCarrinho() {
    this.carrinhoData = ({
      idCliente: '',
      idSessaoCobranca: '',
      idPagamento: '',
      produtos: [],
      dataPedido: new Date(),
      status: 'pendente',
      totalPedido: 0,
      formaPagamento: '',
      statusPagamento: '',
      linkPagamento: ''
    })
  }

}
