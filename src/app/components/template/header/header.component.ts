import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/components/login/login.service';
import { HeaderService } from '../header-res/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sideNavToggle = new EventEmitter();


  constructor(private headerService: HeaderService, private router: Router, private loginService: LoginService) { 
  }

  ngOnInit(): void {
  }

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

  login(): void {
    this.router.navigate(['/login'])
  }

  cadastro(): void {
    this.router.navigate(['/cadastro'])
  }

  sair(): void {
    this.headerService.headerData.autenticado = false;
    if (this.headerService.headerData.perfil == 'cliente') {
      this.router.navigate(['/menu'])
    } else if (this.headerService.headerData.perfil == 'admin' || 'master') {
      this.router.navigate(['/admin'])
    }
  }

  public OnToggleSideNav (){
    this.sideNavToggle.emit();
  }

}
