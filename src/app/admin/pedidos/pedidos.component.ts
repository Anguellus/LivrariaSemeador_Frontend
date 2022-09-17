import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { Pedido } from 'src/app/components/pedidos/pedido.model';
import { ProdutosAdminService } from '../../components/produtos/produtos-admin.service';
import { PedidosAdminService } from '../../components/pedidos/pedidos-admin.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosAdminComponent implements OnInit {

  pedidos: Pedido[] = [];

  displayedColumns = ['numero', 'total_pedido', 'dataPedido', 'dataEntrega', 'status'];

  produtoDisplayedColumns = ['nome', 'preco', 'quantidade', 'total_item'];

  status =  ['Em andamento', 'saiu para entrega', 'entregue']

  constructor(private pedidosAdminSvc: PedidosAdminService, private prodServ: ProdutosAdminService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    if (this.headerService.headerData.autenticado && (this.headerService.headerData.perfil == 'admin' || 'master')) {
      this.pedidosAdminSvc.read().subscribe(pedidos => {
        this.pedidos = pedidos
      })
    } else {
      this.router.navigate(['/'])
    }
  }

  navigateToPedidoCreate(){
    this.router.navigate(['/admin/pedidos/gerenciar'])
  }

}
