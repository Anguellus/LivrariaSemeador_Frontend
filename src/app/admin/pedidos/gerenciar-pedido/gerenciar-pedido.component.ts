import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/components/produtos/produto.model';
import { ProdutosService } from 'src/app/components/produtos/produtos.service';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { Usuario } from 'src/app/components/clientes/cliente.model';
import { Pedido } from 'src/app/components/pedidos/pedido.model';
import { PedidosService } from 'src/app/components/pedidos/pedidos.service';
import { ProdutoPedido } from 'src/app/components/pedidos/produtoPedido.model';
import { ClientesService } from '../../../components/clientes/clientes.service';
import { GerenciarPedidoService } from '../../../components/pedidos/gerenciar-pedido.service';

@Component({
  selector: 'app-gerenciar-pedido',
  templateUrl: './gerenciar-pedido.component.html',
  styleUrls: ['./gerenciar-pedido.component.css']
})
export class GerenciarPedidoComponent implements OnInit {

  clientes: Usuario[] = []
  produtos: Produto[] = []

  clienteSelect: Usuario = {
    nome: '',
    sobrenome: '',
    CPF: '',
    email: '',
    endereco: '',
    password: '',
    telefone: '',
    _id: 0
  }
  produtoSelect: ProdutoPedido = {
    _id: 0,
    idCobranca: '',
    nome: '',
    preco: 0,
    quantidade: 0,
    totalProduto: 0
  }

  totalPedido: number = 0

  formaSelected = ''

  carrinho: ProdutoPedido[] = []

  displayedColumns = ['nome', 'preco', 'quantidade', 'total_item', 'acao']

  constructor(private pedidosSVC: PedidosService, private gerenciarPedidoSrc: GerenciarPedidoService, private produtosSvc: ProdutosService, private clientesService: ClientesService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    if (this.headerService.headerData.autenticado && (this.headerService.headerData.perfil == 'admin' || 'master')) {
      this.clientesService.read().subscribe(clientes => {
        this.clientes = clientes
        this.produtosSvc.readAtivos().subscribe(produtos => {
          for (let index = 0; index < produtos.length; index++) {
            if (produtos[index].estoque != 0) {
              const element = produtos[index];
              this.produtos.push(element)
            }
          }
          this.carrinho = this.gerenciarPedidoSrc.carrinhoData.produtos
          this.clienteSelect = this.gerenciarPedidoSrc.clienteData
          this.totalPedido = this.gerenciarPedidoSrc.totalPedido
          this.produtoSelect = this.gerenciarPedidoSrc.produtoData
          console.log(this.gerenciarPedidoSrc.produtoData)
        })
      })
    } else {
      this.router.navigate(['admin'])
    }
  }

  adicionarAoCarrinho() {
    let prodPedido: ProdutoPedido = {
      _id: 0,
      idCobranca: '',
      nome: '',
      preco: 0,
      quantidade: 0,
      totalProduto: 0
    }

    prodPedido._id = this.produtoSelect._id
    prodPedido.idCobranca = this.produtoSelect.idCobranca
    prodPedido.nome = this.produtoSelect.nome
    prodPedido.preco = this.produtoSelect.preco
    prodPedido.quantidade = this.produtoSelect.quantidade
    prodPedido.totalProduto = this.produtoSelect.quantidade * this.produtoSelect.preco

    if (this.gerenciarPedidoSrc.carrinhoData.idCliente == '') {
      this.gerenciarPedidoSrc.carrinhoData.idCliente = `${this.clienteSelect._id}`
      this.gerenciarPedidoSrc.carrinhoData.dataPedido = new Date()
      this.gerenciarPedidoSrc.clienteData = this.clienteSelect
    }
    this.gerenciarPedidoSrc.produtoData = this.produtoSelect
    this.adicionarProdutoAoCarrinho(prodPedido)
    this.router.navigate(['admin/pedidos/update'])
  }

  adicionarProdutoAoCarrinho(produto: ProdutoPedido) {
    let encontrado: boolean = false
    let indice = 0
    if (produto.quantidade == undefined || 0) {
      this.produtosSvc.showMessage("Quantidade não pode ser 0.", false)
    }
    else {
      if (this.gerenciarPedidoSrc.carrinhoData.produtos.length == 0) {
        this.gerenciarPedidoSrc.carrinhoData.produtos.push(produto)
        this.totalPedido = produto.preco * produto.quantidade
      }
      else {
        for (let index = 0; index < this.gerenciarPedidoSrc.carrinhoData.produtos.length; index++) {
          const element = this.gerenciarPedidoSrc.carrinhoData.produtos[index]

          if (element._id == produto._id) {
            encontrado = true
            indice = index
          }
        }
        if (encontrado) {
          this.gerenciarPedidoSrc.carrinhoData.produtos[indice].quantidade = parseInt(`${this.gerenciarPedidoSrc.carrinhoData.produtos[indice].quantidade}`) + parseInt(`${produto.quantidade}`)
          this.totalPedido += (produto.quantidade * produto.preco)
        } else {
          this.gerenciarPedidoSrc.carrinhoData.produtos.push(produto)
          this.totalPedido += (produto.quantidade * produto.preco)
        }
      }
      this.gerenciarPedidoSrc.totalPedido = this.totalPedido
    }
  }

  finalizarPedido() {
    var statusPagamento = ''
    if (this.formaSelected == 'Dinheiro'){
      statusPagamento = 'pendente'
    }
    else if (this.formaSelected == 'Link de pagamento'){
      statusPagamento = 'Email para pagamento enviado!'
    }
    
    let pedido: Pedido = {
      idCliente: `${this.gerenciarPedidoSrc.clienteData._id}`,
      idSessaoCobranca: this.gerenciarPedidoSrc.carrinhoData.idSessaoCobranca,
      status: 'enviado',
      //atencao a esse ponto
      idPagamento: '',
      linkPagamento: '',
      dataPedido: new Date(),
      // formaPagamento: this.gerenciarPedidoSrc.carrinhoData.formaPagamento,
      produtos: this.gerenciarPedidoSrc.carrinhoData.produtos,
      totalPedido: this.totalPedido,
      formaPagamento: this.formaSelected,
      statusPagamento: statusPagamento
    }

    this.pedidosSVC.criarPedido(pedido).subscribe(pedidos => {
      if (this.formaSelected == 'Link de pagamento'){
        console.log("entrou no enviar email do front")
        let v1 = JSON.stringify(pedidos)
        let idDoPedido = JSON.parse(v1).idPedido
        pedido._id = idDoPedido
        this.pedidosSVC.enviarEmailCobranca(pedido).subscribe(pedidos => {
          console.log("RETORNOU: " + pedidos)
        })
      }
      this.totalPedido = 0
      this.zerarProduto()
      this.zerarCliente()
      this.zerarProduto()
      this.pedidosSVC.showMessage("Pedido finalizado. Acompanhe o andamento em pedidos.")
      this.router.navigate(['/admin/pedidos'])
    })
  }

  voltar() {
    this.totalPedido = 0
    this.zerarProduto()
    this.zerarCliente()
    this.zerarProduto()
    console.log(this.clienteSelect)
    console.log(this.produtoSelect)
    console.log(this.totalPedido)
    console.log(this.carrinho)
    this.router.navigate(['admin/pedidos'])
  }

  removerItem(idProduto: number) {
    console.log("TOTAL PEDIDO ANTES: " + this.totalPedido)
    for (let index = 0; index < this.gerenciarPedidoSrc.carrinhoData.produtos.length; index++) {
      console.log("REMOVER ITEM PROD: " + idProduto)
      console.log("REMOVER ITEM INDEX: " + this.gerenciarPedidoSrc.carrinhoData.produtos[index]._id)
      if (idProduto == this.gerenciarPedidoSrc.carrinhoData.produtos[index]._id) {
        this.totalPedido -= this.gerenciarPedidoSrc.carrinhoData.produtos[index].totalProduto
        this.gerenciarPedidoSrc.carrinhoData.produtos.splice(index, 1)
      }
    }
    this.gerenciarPedidoSrc.totalPedido = this.totalPedido
    console.log("CARRINHO DATA TOTAL PEDIDO: " + this.gerenciarPedidoSrc.carrinhoData.totalPedido)
    console.log("GERENCIAR PEDIDO TOTAL PEDIDO: " + this.gerenciarPedidoSrc.totalPedido)
    console.log("TOTAL PEDIDO DEPOIS: " + this.totalPedido)
    this.router.navigate(['admin/pedidos/update'])
  }

  zerarProduto() {
    this.produtoSelect = {
      _id: 0,
      idCobranca: '',
      nome: '',
      preco: 0,
      quantidade: 0,
      totalProduto: 0
    }
  }

  zerarCliente() {
    this.clienteSelect = {
      _id: 0,
      nome: '',
      sobrenome: '',
      CPF: '',
      email: '',
      endereco: '',
      password: '',
      telefone: ''
    }
  }

  zerarPedido() {
    this.carrinho = []
    this.totalPedido = 0
  }

}
