import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UsuarioAdmin } from './usuariosAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosAdminService {

  baseURL = `${environment.API}admin/`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  createCadastro(usuarioAdmin: UsuarioAdmin): Observable<UsuarioAdmin> {
    console.log("CREATE CADASTRO: " + JSON.stringify(usuarioAdmin))
    return this.http.post<UsuarioAdmin>(this.baseURL, usuarioAdmin).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readByUser(id: string): Observable<UsuarioAdmin> {
    const url = `${this.baseURL}${id}`
    console.log("URL: " + url)
    return this.http.get<UsuarioAdmin>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  read(): Observable<UsuarioAdmin[]> {
    return this.http.get<UsuarioAdmin[]>(this.baseURL).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY;
  }

  delete(usuario: UsuarioAdmin): Observable<UsuarioAdmin> {
    const url = `${this.baseURL}${usuario._id}`
    console.log(url)
    return this.http.delete<UsuarioAdmin>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(usuario: UsuarioAdmin): Observable<UsuarioAdmin> {
    const url = `${this.baseURL}${usuario._id}`
    console.log(url)
    console.log("USUARIO UPDATE SERVICE: " + JSON.stringify(usuario))
    return this.http.put<UsuarioAdmin>(url, usuario).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

}
