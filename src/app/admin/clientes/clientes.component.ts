import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { Usuario } from 'src/app/components/clientes/cliente.model';
import { ClientesService } from '../../components/clientes/clientes.service';

@Component({
  selector: 'app-clientes-admin',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesAdminComponent implements OnInit {

  usuarios: Usuario[] = [];
  displayedColumns = ['id', 'nome','CPF', 'email', 'endereco', 'telefone', 'action'];

  constructor(private clientesService: ClientesService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.headerService.headerData)
    if (this.headerService.headerData.autenticado && (this.headerService.headerData.perfil == 'admin' || this.headerService.headerData.perfil == 'master')){
      this.clientesService.read().subscribe(usuarios => {
        this.usuarios = usuarios
      })
    } else {
      this.router.navigate(['admin'])
    }
  }

  navigateToClienteCreate(){
    this.router.navigate(['admin/clientes/create'])
  }

}
