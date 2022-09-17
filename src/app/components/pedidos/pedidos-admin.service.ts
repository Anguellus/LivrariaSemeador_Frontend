import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pedido } from 'src/app/components/pedidos/pedido.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosAdminService {
  
  baseURL = `${environment.API}pedidos/`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  read(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseURL)
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY;
  }

  readByPedido(idPedido: string): Observable<Pedido[]> {
    const url = `${this.baseURL}detalhe/${idPedido}`
    return this.http.get<Pedido[]>(url)
  }

  update(pedido: Pedido): Observable<Pedido> {
    const url = `${this.baseURL}${pedido._id}`
    return this.http.put<Pedido>(url, pedido).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(idPedido: number): Observable<Pedido> {
    const url = `${this.baseURL}${idPedido}`
    return this.http.delete<Pedido>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }
}
