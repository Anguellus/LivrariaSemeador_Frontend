import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject } from 'rxjs';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { catchError, map } from 'rxjs/operators';
import { LoginAdmin }from './loginAdmin.model';
import { HeaderData } from '../template/header-res/header-data.model';
import { UsuarioAdmin } from '../usuarios/usuariosAdmin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {
  
  baseURLLogin = `${environment.API}admin/`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  createLogin(usuario: string, pass: string): Observable<LoginAdmin> {
    let usuarioAdmin: LoginAdmin = {
      usuario: usuario,
      password: pass
    }
    return this.http.post<LoginAdmin>(this.baseURLLogin, usuarioAdmin).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readByUser(usuario: string): Observable<UsuarioAdmin> {
    const url = `${this.baseURLLogin}login/${usuario}`
    console.log(url)
    return this.http.get<UsuarioAdmin>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY;
  }
  
}
