import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CarrinhoService } from 'src/app/components/carrinho/carrinho.service';
import { ProdutoPedido } from 'src/app/components/pedidos/produtoPedido.model';
import { Produto } from 'src/app/components/produtos/produto.model';
import { ProdutosService } from 'src/app/components/produtos/produtos.service';
import { HeaderService } from 'src/app/components/template/header-res/header.service';

@Component({
  selector: 'app-busca-produto',
  templateUrl: './busca-produto.component.html',
  styleUrls: ['./busca-produto.component.css']
})
export class BuscaProdutoComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  
  produtos: Produto[] = [];

  autenticado: boolean = false

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router, private headerSrv: HeaderService, private carSvc: CarrinhoService, private produtoService: ProdutosService) { }

  textoBusca = ''

  ngOnInit(): void {
    console.log("Heaher: " + this.headerSrv.headerData.textoBusca)
    console.log("textBusca: " + this.textoBusca)

    if (this.textoBusca != this.headerSrv.headerData.textoBusca) {
      this.textoBusca = this.headerSrv.headerData.textoBusca

      this.produtoService.readByDesc(this.textoBusca).subscribe(produtos => {
        this.produtos = produtos
        this.textoBusca = ''
      })
    }
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

}
