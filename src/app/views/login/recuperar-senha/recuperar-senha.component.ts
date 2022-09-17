import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../components/login/login.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  cpf: string = ''

  cadastroForm = this.fb.group({
    CPF: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  recuperarSenha() {
    console.log(this.cpf)
    if (this.cpf != null) {
      this.loginService.enviaSenha(this.cpf).subscribe(user => {
        if (user != null) {
          this.loginService.showMessage("Senha enviada para o e-mail cadastrado.", false)
          this.router.navigate(['/login'])
        }
      })
    }
  }

}
