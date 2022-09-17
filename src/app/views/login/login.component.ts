import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { Login } from '../../components/login/login.model';
import { LoginService } from '../../components/login/login.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  idUsuario: string = '';

  usuarioForm: Login = {
    id: '',
    cpf: '',
    password: ''
  }

  usuarioBanco: Login = {
    id: '',
    cpf: '',
    password: ''
  }

  cadastroForm = this.fb.group({
    CPF: ['', Validators.required],
    senha: ['', Validators.required]
  })

  senhaCripto = ''

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder, private headerService: HeaderService, private router: Router, private loginService: LoginService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.usuarioForm.cpf == '' || this.usuarioForm.password == '') {
      this.loginService.showMessage("Preencha os campos cpf e senha.", true)
      this.router.navigate(['/login'])
    } else {
      this.loginService.readByUser(this.usuarioForm.cpf).subscribe(user => {
        if (user == null) {
          this.loginService.showMessage("Usuário ou senha incorretos.", true)
        }
        else {
          let v1 = JSON.stringify(user)
          // console.log(v1)
          let password = JSON.parse(v1).password
          password = this.loginService.decriptSenha(password)
          // console.log(password)
          this.idUsuario = JSON.parse(v1).id
          if (password != this.usuarioForm.password) {
            this.loginService.showMessage("Usuário ou senha incorretos.", true)
            this.router.navigate(['/login'])
          } else {
            this.headerService.headerData = {
              autenticado: true,
              perfil: 'cliente',
              nome: JSON.parse(v1).nome,
              id: JSON.parse(v1)._id,
              itensCarrinho: 0,
              textoBusca: '',
              eRetornoPagamento: false
            }
            this.router.navigate(['/'])
          }
        }
      })
    }
  }

  cadastro(): void {
    this.router.navigate(['/cadastro'])
  }

  cri(){
    this.senhaCripto = this.loginService.critpSenha(this.usuarioForm.password)
  }

}
