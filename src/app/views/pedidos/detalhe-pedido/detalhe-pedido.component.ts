import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { map, shareReplay } from 'rxjs/operators';
import { Produto } from 'src/app/components/produtos/produto.model';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { Pedido } from '../../../components/pedidos/pedido.model';
import { PedidosService } from '../../../components/pedidos/pedidos.service';
import { ProdutoPedido } from '../../../components/pedidos/produtoPedido.model';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.component.html',
  styleUrls: ['./detalhe-pedido.component.css']
})
export class DetalhePedidoComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  pedidos: Pedido[] = []

  pedido: Pedido = {
    idCliente: '',
    dataPedido: new Date(),
    formaPagamento: '',
    idSessaoCobranca: '',
    idPagamento: '',
    produtos: [],
    status: '',
    statusPagamento: '',
    totalPedido: 0,
    _id: 0,
    dataEntrega: new Date(),
    linkPagamento: ''
  }
  produtos: ProdutoPedido[] = []

  // , 'total_pedido', 'dataPedido', 'dataEntrega', 'status'
  displayedColumns = ['numero', 'produtos', 'total_pedido', 'dataPedido', 'dataEntrega', 'status'];

  produtoDisplayedColumns = ['nome', 'preco', 'quantidade', 'total_item'];

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private headerService: HeaderService, private route: ActivatedRoute, private pedidosService: PedidosService) { }

  ngOnInit(): void {
    if (this.headerService.headerData.autenticado && this.headerService.headerData.perfil == 'cliente') {
      const idPedido = this.route.snapshot.paramMap.get('id')
      if (idPedido != null) {
        this.pedidosService.readByPedido(idPedido).subscribe(pedido => {
          //let v1 = JSON.stringify(pedidos)
          this.pedidos = pedido
          this.pedido = pedido[0]

          // console.log("ARRAY DE PEDIDOS: " + JSON.stringify(this.pedidos))
          // console.log("OBJETO UNICO: " + JSON.stringify(this.pedido))
          if (this.pedidos[0].statusPagamento != "Aprovado") {
            this.pedidosService.recuperarStatusPagamentoMercadoPago(this.pedidos[0].idPagamento).subscribe(statusPagamento => {
              let v1 = JSON.stringify(statusPagamento)
              let pagamento = JSON.parse(v1).statusPagamento
              if (pagamento == "approved") {
                this.pedidos[0].statusPagamento = 'Aprovado'
                if (this.pedido._id != undefined) {
                  console.log("Antes do atualizar status pagamento")
                  this.pedidosService.atualizarStatusPagamento(this.pedidos[0], this.pedido._id).subscribe(statusPagamento => {
                    console.log("Retornou da atualização")
                  })
                }
              }
              else {
                this.pedidos[0].statusPagamento = 'Pendente pagamento'
              }
            })
          }
          this.produtos = pedido[0].produtos
          //console.log("PEDIDOS: " + JSON.stringify(this.pedidos))
        })
      }
    } else {
      this.router.navigate(['/'])
    }
  }

  reenviarLinkPagamento() {
    // console.log("Antes do atualizar status pagamento")
    this.pedidosService.enviarEmailCobranca(this.pedidos[0]).subscribe(statusPagamento => {
      this.pedidosService.showMessage("Link para pagamento enviado.", false)
    })
    window.location.href = this.pedidos[0].linkPagamento
  }

  voltar() {
    this.router.navigate(['/pedidos'])
  }

}
