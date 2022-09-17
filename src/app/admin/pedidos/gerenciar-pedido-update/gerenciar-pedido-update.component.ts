import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerenciar-pedido-update',
  templateUrl: './gerenciar-pedido-update.component.html',
  styleUrls: ['./gerenciar-pedido-update.component.css']
})
export class GerenciarPedidoUpdateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['admin/pedidos/gerenciar'])
  }

}
