import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { LoginService } from 'src/app/components/login/login.service';
import { UsuariosAdminService } from '../../../components/usuarios/usuarios-admin.service';
import { UsuarioAdmin } from '../../../components/usuarios/usuariosAdmin.model';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  usuario: UsuarioAdmin = {
    nome: '',
    password: '',
    usuario: '',
    master: false
  }

  constructor(private loginSVC: LoginService, private usuarioSvc: UsuariosAdminService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    if (!this.headerService.headerData.autenticado && this.headerService.headerData.perfil == 'master'){
      this.router.navigate(['admin'])
    }
  }

  cancelar() {
    this.router.navigate(['/admin/usuarios'])
  }

  createUser(): void {

    if (this.usuario.nome == "") {
      this.usuarioSvc.showMessage("Campo USUÁRIO não pode ser vazio")
      this.router.navigate(['/admin/usuarios/create'])
    } else {
      this.usuario.password = this.loginSVC.critpSenha(this.usuario.password)
      this.usuarioSvc.createCadastro(this.usuario).subscribe(mensagem => {
        this.router.navigate(['/admin/usuarios'])
      });
    }
  }

}
