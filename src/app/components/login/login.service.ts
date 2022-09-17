import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { catchError, map } from 'rxjs/operators';
import { Login } from './login.model';
import { Usuario } from '../clientes/cliente.model';
import * as CryptoJS from 'crypto-js'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseURL = `${environment.API}usuarios/`;
  baseURLLogin = "http://localhost:3002/login_server";

  chaveCripto = "rolling thunder"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  createCadastro(usuario: Usuario): Observable<string> {
    return this.http.post<string>(this.baseURL, usuario).pipe(
      map((obj) => this.showMessage(obj, false)),
      catchError(e => this.errorHandler(e))
    );
  }

  createLogin(cpf: string, pass: string): Observable<Login> {
    let login: Login = {
      cpf: cpf,
      password: pass
    }
    return this.http.post<Login>(this.baseURLLogin, login).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readByUser(cpf: string): Observable<Usuario> {
    const url = `${this.baseURL}cpf/${cpf}`
    return this.http.get<Usuario>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY;
  }

  critpSenha(senha: string): string {
    return CryptoJS.AES.
      encrypt(JSON.stringify(senha), this.chaveCripto).
      toString();
  }

  decriptSenha(senha: string): string {
    var bytes = CryptoJS.AES.decrypt(senha, this.chaveCripto);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  enviaSenha(cpf: string): Observable<string> {
    const url = `${this.baseURL}recuperarsenha/${cpf}`
    console.log(url)
    return this.http.get<string>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }
}
