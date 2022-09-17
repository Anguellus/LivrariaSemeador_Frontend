import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PedidosService } from 'src/app/components/pedidos/pedidos.service';
import { Produto } from 'src/app/components/produtos/produto.model';
import { ProdutosService } from 'src/app/components/produtos/produtos.service';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { CarrinhoService } from '../../components/carrinho/carrinho.service';
import { ProdutoPedido } from '../../components/pedidos/produtoPedido.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  
  produtos: Produto[] = [];

  textoBusca = ''

  autenticado: boolean = false

  fotos: string[] = []

  constructor(private pedidosService: PedidosService, private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router, private headerSrv: HeaderService, private carSvc: CarrinhoService, private produtoService: ProdutosService) { }

  ngOnInit(): void {
    // const session_id = this.route.paramMap.
    this.route.queryParams.subscribe(params => {
      console.log(params)
      var sucessoPagamento = params['sucessoPagamento']

      // console.log("SESSION ID: " + session_id)
      console.log("sucessoPagamento: " + sucessoPagamento)
      if (sucessoPagamento == "sim") {

        const idSessaoCobranca = params['preference_id']
        const idPagamento = params['payment_id']
        const statusPagamento =  params['status']
        const formaPagamento =  params['payment_type']

        this.pedidosService.atualizarFormaPagamento(formaPagamento, statusPagamento, idPagamento, idSessaoCobranca).subscribe(retorno => {
          console.log("Retorno " + JSON.stringify(retorno))
        })
       //precisa atualizar o pedido com base no idSessaoCobranca
       // precisa remover os métodos de recuperacao da informacao do pagamento do Stripe
        // this.pedidosService.atualizarStatusPagamento(this.pedidos[0], this.pedido._id).subscribe(statusPagamento => {
        //   console.log("Retornou da atualização")
        // })
        this.router.navigate(['/retornoPagamento'])
      }
      else {
        this.autenticado = this.headerSrv.headerData.autenticado
        this.produtoService.readAtivos().subscribe(produtos => {
          this.produtos = produtos
        })
      }
    })

  }

  incluir(idProduto: number | undefined, nomeProduto: string, preco: number, idCobranca: string): void {
    if (!this.autenticado) {
      this.router.navigate(['/login'])
    } else {
      if (idProduto != undefined) {
        let produto: ProdutoPedido = {
          _id: idProduto,
          idCobranca: idCobranca,
          nome: nomeProduto,
          preco: preco,
          totalProduto: 0,
          quantidade: 0
        }
        this.carSvc.incluirItem(produto)
        this.carSvc.showMessage("Produto incluído no carrinho!")
      }
    }
  }

  buscar(): void {
    console.log(this.textoBusca)
    if (this.textoBusca == '') {
      this.autenticado = this.headerSrv.headerData.autenticado
      this.produtoService.readAtivos().subscribe(produtos => {
        this.produtos = produtos
      })
    }
    else {
      this.produtoService.readByDesc(this.textoBusca).subscribe(produtos => {
        this.produtos = produtos
        this.textoBusca = ''
        console.log("retornou:" + JSON.stringify(produtos))
      })
    }
  }

}
