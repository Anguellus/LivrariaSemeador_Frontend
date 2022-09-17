import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Produto } from 'src/app/components/produtos/produto.model';
import { environment } from 'src/environments/environment';
import { Pedido } from './pedido.model';
import { ProdutoPedido } from './produtoPedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  baseURL = `${environment.API}pedidos/`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  readByCliente(idCliente: string): Observable<Pedido[]> {
    const url = `${this.baseURL}${idCliente}`
    console.log("PEDIDO SRV: " + url)
    return this.http.get<Pedido[]>(url)
  }

  readByPedido(idPedido: string): Observable<Pedido[]> {
    const url = `${this.baseURL}detalhe/${idPedido}`
    return this.http.get<Pedido[]>(url)
  }

  criarPedido(pedido: Pedido): Observable<JSON> {
    // console.log("PEDIDO CRIAR PEDIDO: " + JSON.stringify(pedido))
    console.log(this.baseURL)
    return this.http.post<Pedido>(this.baseURL, pedido).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  atualizarSessaoPagamento(pedido: Pedido, idPedido: string): Observable<Pedido> {
    console.log("ATUALIZAR SESSION PAGAMENTO: " + JSON.stringify(pedido))
    const url = `${this.baseURL}updateSessionPedido/${idPedido}`
    console.log(url)
    return this.http.put<Pedido>(url, pedido).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  atualizarFormaPagamento(formaPagamento: string, statusPagamento: string,idPagamento: string, idSessao: string): Observable<Pedido> {
    console.log("ATUALIZAR FORMA PAGAMENTO: " + formaPagamento)
    const url = `${this.baseURL}updateFormaPagamento/${idSessao}`
    
    var atualizacoesPagamento = {
      formaPagamento: formaPagamento,
      statusPagamento: statusPagamento,
      idPagamento: idPagamento
    }
    return this.http.put<Pedido>(url, atualizacoesPagamento).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  atualizarStatusPagamento(pedido: Pedido, idPedido: number): Observable<Pedido> {
    console.log("ATUALIZAR STATUS PAGAMENTO: " + JSON.stringify(pedido))
    const url = `${this.baseURL}updateStatusPagamento/${idPedido}`
    console.log(url)
    return this.http.put<Pedido>(url, pedido).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  //cobranca STRIPE
  chamarCobrancaStripe(produtos: ProdutoPedido[]){
    console.log("Recirecionar para o checkout: " + JSON.stringify(produtos))
    const urlApiStripe = `${environment.API}create-checkout-session`
    console.log(urlApiStripe)
    return this.http.post<Pedido>(urlApiStripe, produtos).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

//cobranca Mercado Pago
  chamarCobrancaMercadoPago(produtos: ProdutoPedido[]): Observable<string>{
   
    // const orderData = {
    //   quantity: 2,
    //   description: "Teste Angular",
    //   price: 10.0
    // };
    
    const url = `${this.baseURL}create_preference`
    console.log(url)
    return this.http.post<Pedido>(url, produtos).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  enviarEmailCobranca(pedido: Pedido){
    console.log("Gerar e-mail cobraça com link pagamento: " + JSON.stringify(pedido))
    const urlApiStripe = `${environment.API}gerar-email-cobranca`
    console.log(urlApiStripe)
    return this.http.post<Pedido>(urlApiStripe, pedido).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  recuperarStatusPagamentoStripe (idSessao: string): Observable<JSON> {
    // console.log("Recuperar a sessao de pagamento e status: " + idSessao)
    const url = `${this.baseURL}recuperaSessaoPagamento/${idSessao}`
    // console.log(url)
    return this.http.get<Pedido>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  recuperarStatusPagamentoMercadoPago (idSessao: string): Observable<JSON> {
    // console.log("Recuperar a sessao de pagamento e status: " + idSessao)
    const url = `${this.baseURL}recuperaSessaoPagamentoMP/${idSessao}`
    // console.log(url)
    return this.http.get<Pedido>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY;
  }

  // readById(id: string): Observable<Produto> {
  //   const url = `${this.baseURL}${id}`
  //   console.log(url)
  //   return this.http.get<Produto>(url).pipe(
  //     map((obj) => obj),
  //     catchError(e => this.errorHandler(e))
  //   );
  // }

  // update(product: Produto): Observable<Produto> {
  //   const url = `${this.baseURL}${product._id}`
  //   return this.http.put<Produto>(url, product).pipe(
  //     map((obj) => obj),
  //     catchError(e => this.errorHandler(e))
  //   );
  // }
}
