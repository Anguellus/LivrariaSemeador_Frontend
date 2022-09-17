import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho-delete',
  templateUrl: './carrinho-delete.component.html',
  styleUrls: ['./carrinho-delete.component.css']
})
export class CarrinhoDeleteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log("DENTRO DO CARRINHO DELETE COMPONENT")
    this.router.navigate(['/carrinho'])
  }

}
