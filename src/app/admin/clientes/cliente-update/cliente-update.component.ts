import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { ValidaCadastroService } from 'src/app/components/login/valida-cadastro.service';
import { LoginService } from 'src/app/components/login/login.service';
import { Usuario } from 'src/app/components/clientes/cliente.model';
import { ClientesService } from '../../../components/clientes/clientes.service';
// import { ValidaCadastro } from '../../../views/login/cadastro/validaCadastro';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Usuario = {
    CPF: '',
    sobrenome: '',
    email: '',
    endereco: '',
    nome: '',
    password: '',
    telefone: ''
  }

  checkPassword = ''
  password= ''

  perfil = ''

  cadastroForm = this.fb.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required],
    CPF: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), ValidaCadastroService.ValidaCpf]],
    email: ['', [Validators.required, Validators.email]],
    endereco: ['', Validators.required],
    telefone: ['', [Validators.required, Validators.minLength(9)]]

  })

  // password: ['', Validators.required],
  // checkPassword: ['', [Validators.required, ValidaCadastroService.senhasIguais]]

  constructor(private fb: FormBuilder, private loginSVC: LoginService, private route: ActivatedRoute, private clientesService: ClientesService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    this.perfil = this.headerService.headerData.perfil
    const idCliente = this.route.snapshot.paramMap.get('id')
    // console.log(this.headerService.headerData.autenticado)
    if (this.headerService.headerData.autenticado) {
      if (idCliente != null) {
        this.clientesService.readById(idCliente).subscribe(cliente => {
          this.cliente = cliente
          console.log("INIT: " + JSON.stringify(this.cliente))
        })
      }
    } else {
      this.router.navigate(['admin/clientes'])
    }
  }

  updateCliente(): void {
    console.log("UPDATE CLIENTE COMPONENT: " + JSON.stringify(this.cliente))
    // this.cliente.password = this.loginSVC.critpSenha(this.cliente.password)
    this.clientesService.update(this.cliente).subscribe(usuario => {
      this.clientesService.showMessage('Cliente atualizado')
      if (this.headerService.headerData.perfil=="cliente"){
        this.router.navigate(['/'])
      }
      else{
        this.router.navigate(['/admin/clientes'])
      }
    })
  }

  cancelar(): void {
    if(this.headerService.headerData.perfil=='cliente'){
      this.router.navigate(['/'])
    }
    else{
      this.router.navigate(['/admin/clientes'])
    }
  }

  trocarSenha(CPF: string): void {
    this.router.navigate(['/trocarSenha/'+CPF])
  }

}
