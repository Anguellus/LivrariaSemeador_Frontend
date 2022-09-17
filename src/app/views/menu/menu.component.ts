import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header-res/header.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private headerSrv: HeaderService, private router: Router) { }

  textoBusca = ''

  ngOnInit(): void {
    if (this.headerSrv.headerData.textoBusca != ''){
      this.router.navigate(['/buscaProduto'])
    }
    else{
      this.router.navigate(['/'])
    }
  }

}
