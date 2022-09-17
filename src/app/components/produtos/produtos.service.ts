import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Produto } from './produto.model';


@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  // baseURL = "http://localhost:8080/produtos/";
  baseURL = `${environment.API}produtos/`

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  read(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseURL)
  }

  readAtivos(): Observable<Produto[]> {
    const url = `${this.baseURL}ativos`
    return this.http.get<Produto[]>(url)
  }

  readByDesc(descricao: string): Observable<Produto[]> {
    const url = `${this.baseURL}ativos/descricao/${descricao}`
    // /produtos/ativos/descricao/:desc
    console.log(url)
    return this.http.get<Produto[]>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: string): Observable<Produto> {
    const url = `${this.baseURL}${id}`
    console.log(url)
    return this.http.get<Produto>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY;
  }
}


