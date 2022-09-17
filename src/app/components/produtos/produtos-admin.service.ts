import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class ProdutosAdminService {

  baseURL = `${environment.API}produtos/`;

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

  create(product: Produto): Observable<Produto> {
    console.log("Produto: " + product)
    return this.http.post<Produto>(this.baseURL, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY;
  }

  readById(id: string): Observable<Produto> {
    const url = `${this.baseURL}${id}`
    console.log(url)
    return this.http.get<Produto>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(product: Produto): Observable<Produto> {
    const url = `${this.baseURL}${product._id}`
    return this.http.put<Produto>(url, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  upload(foto: File | null, foto2: File | null, foto3: File | null, foto4: File | null, foto5: File | null, foto6: File | null): Observable<Produto> {
    console.log("ENTROU no UPLOAD - FRONT")
    const url = `${this.baseURL}upload`
    const data = new FormData()
    if (foto !=null){
      data.append('foto', foto)
    }
    if (foto2 !=null){
      data.append('foto2', foto2)
    }
    if (foto3 !=null){
      data.append('foto3', foto3)
    }
    if (foto4 !=null){
      data.append('foto4', foto4)
    }
    if (foto5 !=null){
      data.append('foto5', foto5)
    }
    if (foto6 !=null){
      data.append('foto6', foto6)
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data'
      })
    }

    console.log(url)
    console.log(data)
    return this.http.post<Produto>(url, data).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
    //antes o return estava com this.http.post<Produto>("http://localhost:8080/produtos/upload ", data)
    // mas a aplicacão dava o refresh e perdia os valores de autenticação
    // o new Observable não retorna nada.
    // return new Observable()
  }

  delete(id: string): Observable<Produto> {
    const url = `${this.baseURL}${id}`
    console.log(url)
    return this.http.delete<Produto>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }
}
