import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { LoginService } from 'src/app/components/login/login.service';
import { Usuario } from 'src/app/components/clientes/cliente.model';
import { ClientesService } from '../../../components/clientes/clientes.service';
import { ValidaCadastroService } from '../../../components/login/valida-cadastro.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Usuario = {
    CPF: '',
    sobrenome: '',
    email: '',
    endereco: '',
    nome: '',
    password: '',
    telefone: ''
  }

  cadastroForm = this.fb.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required],
    CPF: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), ValidaCadastroService.ValidaCpf]],
    email: ['', [Validators.required, Validators.email]],
    endereco: ['', Validators.required],
    telefone: ['', [Validators.required, Validators.minLength(9)]]
  })

  constructor(private fb: FormBuilder, private loginSvc: LoginService, private clientesService: ClientesService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    if (!this.headerService.headerData.autenticado && (this.headerService.headerData.perfil == 'admin' || this.headerService.headerData.perfil == 'master')){
      this.router.navigate(['admin'])
    }
  }

  cancelar() {
    this.router.navigate(['/admin/clientes'])
  }

  createUser(): void {

    if (this.cliente.CPF == "") {
      this.clientesService.showMessage("Campo CPF não pode ser vazio")
      console.log(this.cliente.nome)
      this.router.navigate(['/admin/clientes/create'])
    } else {
      this.cliente.password = this.gerarSenha()
      this.clientesService.createCadastro(this.cliente).subscribe(mensagem => {
        console.log("MENSAGEM " + mensagem)
        this.router.navigate(['/admin/clientes'])
      });
    }
  }

  gerarSenha(): string{
    return this.loginSvc.critpSenha(Math. random().toString(36).slice(-8)) 
  }

}
