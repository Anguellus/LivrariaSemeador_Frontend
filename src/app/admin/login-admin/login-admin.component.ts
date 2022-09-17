import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { LoginService } from 'src/app/components/login/login.service';
import { UsuarioAdmin } from '../../components/usuarios/usuariosAdmin.model';
import { LoginAdminService } from '../../components/login/login-admin.service';
import { LoginAdmin } from '../../components/login/loginAdmin.model';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  
  usuarioForm: LoginAdmin = {
    usuario: '',
    password: ''
  }

  usuarioBanco: UsuarioAdmin = {
    _id: ' ',
    nome: '',
    usuario: '',
    password: ''
  }

  constructor(private breakpointObserver: BreakpointObserver, private headerService: HeaderService, private loginService: LoginService, private router: Router, private loginAdminService: LoginAdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.usuarioForm.usuario == '' || this.usuarioForm.password == '') {
      this.loginAdminService.showMessage("Preencha os campos usuário e senha.", true)
      this.router.navigate(['/admin'])
    } else {
      this.loginAdminService.readByUser(this.usuarioForm.usuario).subscribe(user => {
        this.usuarioBanco = user
        console.log(JSON.stringify(this.usuarioBanco))
        let senhaDecripto = this.loginService.decriptSenha(this.usuarioBanco.password)
        if (senhaDecripto != this.usuarioForm.password) {
          this.loginAdminService.showMessage("Usuário ou senha incorretos.", true)
          this.router.navigate(['/admin'])
        } else {
          if (this.usuarioBanco._id != null){
            this.headerService.headerData = {
              autenticado: true,
              perfil:  'admin',
              nome: this.usuarioBanco.usuario,
              id: this.usuarioBanco._id,
              itensCarrinho: 0,
              textoBusca: '',
              eRetornoPagamento: false
            }
          }
          let perfil = this.usuarioBanco.master
          if (perfil){
            this.headerService.headerData.perfil = 'master'
          }
          console.log(JSON.stringify(this.headerService.headerData))  
          this.router.navigate(['/admin/produtos'])
        }
      })
    }
  }
}
