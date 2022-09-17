import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
// import { constructor } from 'crypto-js';
import { Produto } from 'src/app/components/produtos/produto.model';
import { ProdutosService } from 'src/app/components/produtos/produtos.service';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { CarrinhoService } from '../../components/carrinho/carrinho.service';
import { ProdutoPedido } from '../../components/pedidos/produtoPedido.model';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  autenticado: boolean = false

  produto: Produto = {
    autor: '',
    idCobranca: '',
    estoque: 0,
    ativo: false,
    foto: '',
    foto2: '',
    foto3: '',
    foto4: '',
    foto5: '',
    foto6: '',
    nome: '',
    preco: 0,
    resumo: ''
  }

  fotoPrincipal = ''

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private route: ActivatedRoute, private headerSrv: HeaderService, private carSvc: CarrinhoService, private produtoService: ProdutosService) { }

  ngOnInit(): void {
    this.autenticado = this.headerSrv.headerData.autenticado
    const id = this.route.snapshot.paramMap.get('id')
      if (id != null) {
        this.produtoService.readById(id).subscribe(produto => {
          this.produto = produto
          this.fotoPrincipal = produto.foto
        })
      }
  }

  incluir(idProduto: number | undefined, nomeProduto: string, preco: number): void {
    console.log(this.autenticado)
    if (!this.autenticado){
      this.router.navigate(['/login'])
    } else{
      if (idProduto != undefined) {
        let produto: ProdutoPedido = {
          _id: idProduto,
          idCobranca: '',
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

  alterarFoto(novaFoto: string){
    this.fotoPrincipal = novaFoto
  }

  voltar() {
    if (this.headerSrv.headerData.perfil == "cliente"){
      this.router.navigate(['/'])
    }
    else{
      this.router.navigate(['/admin/produtos'])
    }

  }


}
