import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { Usuario } from 'src/app/components/clientes/cliente.model';
import { ClientesService } from '../../../components/clientes/clientes.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Usuario = {
    CPF: '',
    sobrenome: '',
    email: '',
    endereco: '',
    nome: '',
    password: '',
    telefone: ''
  }

  constructor(private route: ActivatedRoute, private clientesService: ClientesService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (this.headerService.headerData.autenticado && (this.headerService.headerData.perfil == 'admin' || this.headerService.headerData.perfil == 'master')) {
      if (id != null) {
        this.clientesService.readById(id).subscribe(cliente => {
          this.cliente = cliente
        })
      }
    } else {
      this.router.navigate(['admin/clientes'])
    }
  }

  deleteCliente(): void {
    this.clientesService.delete(this.cliente).subscribe(cliente => {
      this.clientesService.showMessage('Cliente excluído')
      this.router.navigate(['/admin/clientes'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/admin/clientes'])
  }

}
