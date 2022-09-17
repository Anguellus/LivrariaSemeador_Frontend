import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/components/clientes/clientes.service';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { ValidaCadastroService } from '../../../components/login/valida-cadastro.service';
import { LoginService } from '../../../components/login/login.service';
import { Usuario } from '../../../components/clientes/cliente.model';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.css']
})
export class TrocarSenhaComponent implements OnInit {

  senhaAtual = ''
  senhaAtualBanco = ''

  checkPassword = ''
  password = ''

  perfil = ''

  CPFCliente = ""

  cadastroForm = this.fb.group({
    senhaAtualBanco: [''],
    senhaAtual: ['', [Validators.required, ValidaCadastroService.senhasIguais]],
    novaSenha: ['', [Validators.required]],
    confirmaSenha: ['', [Validators.required, ValidaCadastroService.confirmasenhasIguais]],
  })

  constructor(private fb: FormBuilder, private loginSVC: LoginService, private route: ActivatedRoute, private clientesService: ClientesService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    this.perfil = this.headerService.headerData.perfil
    const cpfCliente = this.route.snapshot.paramMap.get('CPF')
    // console.log(this.headerService.headerData.autenticado)
    if (this.headerService.headerData.autenticado) {
      if (cpfCliente != null) {
        this.clientesService.readByCPF(cpfCliente).subscribe(cliente => {
          this.senhaAtualBanco = this.loginSVC.decriptSenha(cliente.password)
        })
      }
    } else {
      this.router.navigate(['admin/clientes'])
    }
  }

  trocarSenha(): void {
    const cpfCliente = this.route.snapshot.paramMap.get('CPF')
    let senhaCripto = this.loginSVC.critpSenha(this.password)
    if (cpfCliente != null) {
      this.clientesService.updateSenha(cpfCliente, senhaCripto).subscribe(resultado =>{
        this.clientesService.showMessage("Senha atualizada!")
        this.router.navigate(['/'])
      })
    }
  }

}
