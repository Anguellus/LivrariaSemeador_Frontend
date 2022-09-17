import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../components/login/login.service';
import { Login } from '../../../components/login/login.model';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Usuario } from '../../../components/clientes/cliente.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidaCadastroService } from '../../../components/login/valida-cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = {
    nome: '',
    sobrenome: '',
    CPF: '',
    email: '',
    endereco: '',
    password: '',
    telefone: ''
  }
  checkPass: String = '';

  login : Login ={
    cpf: '',
    password: ''
  }

  cadastroForm = this.fb.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required],
    CPF: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), ValidaCadastroService.ValidaCpf]],
    email: ['', [Validators.required, Validators.email]],
    endereco: ['', Validators.required],
    telefone: ['', [Validators.required, Validators.minLength(9)]],
    novaSenha: ['', Validators.required],
    checkPassword: ['', [Validators.required, ValidaCadastroService.confirmasenhasIguais]]
  })

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {

  }

  createUser(): void {

    if (this.usuario.nome == "") {
      this.loginService.showMessage("Campo Usuário não pode ser vazio")
      console.log(this.usuario.nome)
      this.router.navigate(['/cadastro'])
    } else if (this.usuario.password == "" || this.checkPass!=this.usuario.password) {
      this.loginService.showMessage("Campo Senha não pode ser vazio e deve coincidir.")
      this.router.navigate(['/cadastro'])
    }
    else {
      let senhaCripto = this.loginService.critpSenha(this.usuario.password)
      this.usuario.password = senhaCripto
      this.loginService.readByUser(this.usuario.CPF).subscribe(usuario => {
        if (usuario == null){
          this.loginService.createCadastro(this.usuario).subscribe(mensagem => {
            // console.log("MENSAGEM " + mensagem)
            this.loginService.showMessage("Cadastro realizado com sucesso!")
            this.router.navigate(['/login'])
          });
        }
        else{
          this.loginService.showMessage("CPF já cadastrado!", true)
          this.usuario = {
            CPF: '',
            email: '',
            endereco: '',
            nome: '',
            password: '',
            sobrenome: '',
            telefone: ''
          }
          this.checkPass = ''
        }
      })
      
      // this.loginService.createLogin(this.usuario.email, this.usuario.password).subscribe(() => {
      //   console.log("chamou Login Service");
      // });
    }
  }

  cancelar(): void {
    this.router.navigate(['/'])
  }

}
