import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho-update',
  templateUrl: './carrinho-update.component.html',
  styleUrls: ['./carrinho-update.component.css']
})
export class CarrinhoUpdateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
      console.log("DENTRO DO CARRINHO UPDATE COMPONENT")
      this.router.navigate(['/carrinho'])
  }

}
