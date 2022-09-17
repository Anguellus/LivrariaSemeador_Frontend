import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { LoginService } from 'src/app/components/login/login.service';
import { UsuariosAdminService } from '../../../components/usuarios/usuarios-admin.service';
import { UsuarioAdmin } from '../../../components/usuarios/usuariosAdmin.model';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  usuario: UsuarioAdmin = {
    nome: '',
    password: '',
    usuario: '',
    master: false
  }

  constructor(private loginSVC: LoginService, private route: ActivatedRoute, private usuarioSvc: UsuariosAdminService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    const idUsuario = this.route.snapshot.paramMap.get('id')
    if (this.headerService.headerData.autenticado && this.headerService.headerData.perfil == 'master') {
      if (idUsuario != null) {
        this.usuarioSvc.readByUser(idUsuario).subscribe(usuario => {
          console.log("USUARIO ON INIT UPDATE: " + JSON.stringify(usuario))
          this.usuario = usuario
        })
      }
    } else {
      this.router.navigate(['admin/usuarios'])
    }
  }

  updateUsuario(): void {
    console.log("UPDATE USUARIO: "+ JSON.stringify(this.usuario))
    this.usuario.password = this.loginSVC.critpSenha(this.usuario.password)
    console.log(this.usuario.password)
    this.usuarioSvc.update(this.usuario).subscribe(usuario => {
      this.usuarioSvc.showMessage('Usuário alterado')
      this.router.navigate(['/admin/usuarios'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/admin/usuarios'])
  }

}
