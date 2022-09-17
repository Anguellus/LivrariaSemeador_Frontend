import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { Pedido } from '../../components/pedidos/pedido.model';
import { PedidosService } from '../../components/pedidos/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  pedidos: Pedido[] = [];

  displayedColumns = ['numero', 'total_pedido', 'dataPedido', 'dataEntrega', 'status'];
  displayedColumnsHandSet = ['dataPedido', 'total_pedido','status'];

  produtoDisplayedColumns = ['nome', 'preco', 'quantidade', 'total_item'];

  constructor(private breakpointObserver: BreakpointObserver, private headerService: HeaderService, private pedidosService: PedidosService, private router: Router) { }

  ngOnInit(): void {
    if (this.headerService.headerData.autenticado && this.headerService.headerData.perfil == 'cliente') {
      this.pedidosService.readByCliente(this.headerService.headerData.id).subscribe(pedidos => {
        console.log("PEDIDOS: " + JSON.stringify(pedidos))
        //let v1 = JSON.stringify(pedidos)
        this.pedidos = pedidos
      })
    } else {
      this.router.navigate(['/'])
    }
  }

  get autenticado(): boolean {
    return this.headerService.headerData.autenticado;
  }

}
