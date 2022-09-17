import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderData } from './header-data.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new BehaviorSubject<HeaderData>({
    autenticado: true,
    perfil: 'cliente',
    nome: 'Andre',
    id: '6163150b845aed31e469a4c1',
    itensCarrinho: 0,
    textoBusca: '',
    eRetornoPagamento: false
  })

  constructor() { }

  get headerData(): HeaderData {
    return this._headerData.value
  }

  set headerData(headerData: HeaderData) {
    this._headerData.next(headerData)
  }
}
