import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { UsuariosAdminService } from '../../../components/usuarios/usuarios-admin.service';
import { UsuarioAdmin } from '../../../components/usuarios/usuariosAdmin.model';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {

  usuario: UsuarioAdmin = {
    nome: '',
    password: '',
    usuario: ''
  }

  constructor(private route: ActivatedRoute, private usuarioScv: UsuariosAdminService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (this.headerService.headerData.autenticado && this.headerService.headerData.perfil == 'master') {
      if (id != null) {
        this.usuarioScv.readByUser(id).subscribe(usuario => {
          this.usuario = usuario
          console.log(JSON.stringify(this.usuario))
        })
      }
    } else {
      this.router.navigate(['admin/usuarios'])
    }
  }

  deleteUsuario(): void {
    this.usuarioScv.delete(this.usuario).subscribe(usuario => {
      this.usuarioScv.showMessage('Usuário excluído')
      this.router.navigate(['/admin/usuarios'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/admin/usuarios'])
  }

}
