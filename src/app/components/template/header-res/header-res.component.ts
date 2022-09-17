import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/components/login/login.service';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { CarrinhoService } from 'src/app/components/carrinho/carrinho.service';
import { ProdutosService } from '../../produtos/produtos.service';
import { Produto } from '../../produtos/produto.model';

@Component({
  selector: 'app-header-res',
  templateUrl: './header-res.component.html',
  styleUrls: ['./header-res.component.css']
})
export class HeaderResComponent {

  produtos: Produto[] = [];

  textoBusca = ''

  auth: boolean = false

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private produtoService: ProdutosService, private carrinhoSvc: CarrinhoService, private breakpointObserver: BreakpointObserver, private headerService: HeaderService, private router: Router, private loginService: LoginService) {}

  get autenticado(): boolean {
    return this.headerService.headerData.autenticado;
  }

  get perfil(): string {
    return this.headerService.headerData.perfil;
  }

  get nome(): string {
    return this.headerService.headerData.nome;
  }

  get qtdItens(): number {
    return this.headerService.headerData.itensCarrinho
  }

  get idAuth(): string {
    return this.headerService.headerData.id
  }

  login(): void {
    this.router.navigate(['/login'])
  }

  cadastro(): void {
    this.router.navigate(['/cadastro'])
  }

  sair(): void {
    this.headerService.headerData.autenticado = false;
    this.carrinhoSvc.limparCarrinho();

    this.headerService.headerData.itensCarrinho = 0
    if (this.headerService.headerData.perfil == 'cliente') {
      this.router.navigate(['/'])
    } else if (this.headerService.headerData.perfil == 'admin' || 'master') {
      this.router.navigate(['/admin'])
    }
  }

  buscar(): void {
    // console.log(this.textoBusca)
    this.headerService.headerData.textoBusca= this.textoBusca
    if (this.textoBusca == '') {
      this.router.navigate(['/menu'])
    }
    else {
      this.router.navigate(['/menu'])
    }
    this.textoBusca = ''
    console.log("Navegar para busca produto: " + this.headerService.headerData.textoBusca)
  }
}
