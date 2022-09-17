import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { Pedido } from '../../components/pedidos/pedido.model';
import { PedidosService } from '../../components/pedidos/pedidos.service';
import { CarrinhoService } from '../../components/carrinho/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})

export class CarrinhoComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  pedido: Pedido[] = []
  totalPedido: number = 0

  formaSelected = ''

  displayedColumns = ['produtos'];
  // , 'total_pedido', 'status'

  produtoDisplayedColumns = ['nome', 'preco', 'quantidade', 'total_item', 'action'];
  produtoDisplayedColumnsHandset = ['nome', 'preco', 'quantidade', 'total_item'];

  constructor(private breakpointObserver: BreakpointObserver, private headerSvc: HeaderService, private pedidosSvc: PedidosService, private router: Router, private carrinhoSvc: CarrinhoService) { }

  ngOnInit(): void {
    if (this.headerSvc.headerData.autenticado) {
      this.pedido.push(this.carrinhoSvc.carrinhoData)
      //this.produtos = this.carrinhoSvc.carrinhoData.produtos
      for (let index = 0; index < this.pedido[0].produtos.length; index++) {
        const total_item = this.pedido[0].produtos[index].preco * this.pedido[0].produtos[index].quantidade;
        this.totalPedido = this.totalPedido + total_item
      }
    }
    else {
      this.pedidosSvc.showMessage('É preciso estar logado para acessar o carrinho!', true)
      this.router.navigate(['/'])
    }
  }

  removerItem(idProduto: number) {
    console.log("REMOVER ITEM COKPONENT: " + idProduto)
    this.carrinhoSvc.removerItem(idProduto)
    this.router.navigate(['/carrinho/delete'])
  }

  aumentarQtd(idProduto: number) {
    this.carrinhoSvc.aumentarQtd(idProduto)
    console.log("Aumentar quantidade: " + this.totalPedido)
    this.router.navigate(['/carrinho/update'])
  }

  diminuirQtd(idProduto: number) {
    console.log("Diminuir quantidade: " + this.totalPedido)
    this.carrinhoSvc.diminuirQtd(idProduto)
    this.router.navigate(['/carrinho/update'])
  }

  finalizarPedido() {
    // console.log("FINALIZAR PEDIDO: " + JSON.stringify(this.pedido))
    this.pedido[0].dataPedido = new Date()
    this.pedido[0].totalPedido = this.totalPedido
    this.pedido[0].formaPagamento = this.formaSelected
    this.pedido[0].statusPagamento = "Pendente pagamento"
    this.pedidosSvc.criarPedido(this.pedido[0]).subscribe(pedidos => {
      // this.realizarCobranca(this.pedido[0].totalPedido)
      let v1 = JSON.stringify(pedidos)
      let idDoPedido = JSON.parse(v1).idPedido
      console.log("Retorno da inserção: " + idDoPedido)
      if(this.formaSelected == 'Cartão de Crédito'){
        // this.realizarCobrancaStripe(idDoPedido)
        this.realizarCobrancaMercadoPago(idDoPedido)
      }
      this.pedido[0].status = 'enviado'
      this.totalPedido = 0
      this.headerSvc.headerData.itensCarrinho = 0
      this.carrinhoSvc.limparCarrinho()
      this.pedidosSvc.showMessage("Direcionando para o site de pagamento!")
      this.router.navigate(['/'])
    })
  }

  //método de cobrança Cartão de crédito do Stripe
  realizarCobrancaStripe(idPedido: string) {
    // console.log(this.pedido[0].produtos)
    let produtos = this.pedido[0].produtos
    this.pedidosSvc.chamarCobrancaStripe(produtos).subscribe(retorno => {
      console.log("Chegou aqui: " + retorno.session.id)
      this.pedido[0].idSessaoCobranca = retorno.session.id
      this.pedidosSvc.atualizarSessaoPagamento(this.pedido[0], idPedido).subscribe(pedidos => {
        console.log("Atualizou a SESSION****************************")
      })
      window.location.href = retorno.session.url
      // salvar vriável no local storage após o redirecionanemto
    })
  }

  //método de cobrança Cartão de crédito do Mercado Pago
  realizarCobrancaMercadoPago(idPedido: string) {
    console.log("Clicado")
    let produtos = this.pedido[0].produtos
    this.pedidosSvc.chamarCobrancaMercadoPago(produtos).subscribe(retorno => {
      console.log(JSON.stringify(retorno))
      let v1 = JSON.stringify(retorno)
      let redirect = JSON.parse(v1).redirect
      let idSessao = JSON.parse(v1).id
      console.log(redirect)
      this.pedido[0].linkPagamento = redirect

      console.log("Chegou aqui: " + idSessao)
      this.pedido[0].idSessaoCobranca = idSessao
      this.pedidosSvc.atualizarSessaoPagamento(this.pedido[0], idPedido).subscribe(pedidos => {
        console.log("Atualizou a SESSION NA BASE " + idSessao + "****************************")
      })
      this.headerSvc.headerData.eRetornoPagamento = true
      window.location.href = redirect
    })
  }
}
