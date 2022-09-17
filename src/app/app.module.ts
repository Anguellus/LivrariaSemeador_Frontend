import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StripeModule } from "stripe-angular"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component'
import { MatCardModule } from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list'
import { BidiModule } from '@angular/cdk/bidi'
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge'
import { MatSelectModule } from '@angular/material/select';

import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { CadastroComponent } from './views/login/cadastro/cadastro.component';
import { CarrinhoComponent } from './views/carrinho/carrinho.component';

// import { DetalheProdutoComponent } from './views/detalheProduto/detalheProduto.component';

import { UsuariosAdminComponent } from './admin/usuarios/usuarios.component';

import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { ReactiveFormsModule } from '@angular/forms'

import { ProdutosAdminComponent } from './admin/produtos/produto-admin.component';
import { ProdutoCreateComponent } from './admin/produtos/produto-create/produto-create.component';
import { ProdutoUpdateComponent } from './admin/produtos/produto-update/produto-update.component';
import { ProdutoDeleteComponent } from './admin/produtos/produto-delete/produto-delete.component';

import { CarrinhoUpdateComponent } from './views/carrinho/carrinho-update/carrinho-update.component';
import { CarrinhoDeleteComponent } from './views/carrinho/carrinho-delete/carrinho-delete.component';

import { PedidosComponent } from './views/pedidos/pedidos.component';
import { DetalhePedidoComponent } from './views/pedidos/detalhe-pedido/detalhe-pedido.component';

import { PedidosAdminComponent } from './admin/pedidos/pedidos.component';
import { DetalheAdminPedidoComponent } from './admin/pedidos/detalhe-pedido/detalhe-pedido.component';

import { ClientesAdminComponent } from './admin/clientes/clientes.component';
import { ClienteCreateComponent } from './admin/clientes/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './admin/clientes/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './admin/clientes/cliente-delete/cliente-delete.component';
import { UsuarioDeleteComponent } from './admin/usuarios/usuario-delete/usuario-delete.component';
import { UsuarioCreateComponent } from './admin/usuarios/usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './admin/usuarios/usuario-update/usuario-update.component';
import { GerenciarPedidoComponent } from './admin/pedidos/gerenciar-pedido/gerenciar-pedido.component';
import { GerenciarPedidoUpdateComponent } from './admin/pedidos/gerenciar-pedido-update/gerenciar-pedido-update.component';
import { HeaderResComponent } from './components/template/header-res/header-res.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';

import { BREAKPOINTS, DEFAULT_BREAKPOINTS } from '@angular/flex-layout';
import { DetalheProdutoComponent } from './views/detalhe-produto/detalhe-produto.component';
import { RecuperarSenhaComponent } from './views/login/recuperar-senha/recuperar-senha.component';
import { TrocarSenhaComponent } from './views/login/trocar-senha/trocar-senha.component';
import { RetornoPagamentoComponent } from './views/carrinho/retorno-pagamento/retorno-pagamento.component';
import { BuscaProdutoComponent } from './views/home/busca-produto/busca-produto.component';

registerLocaleData(localePt);

export const BreakPointsProvider = {
  provide: BREAKPOINTS,
  useValue: DEFAULT_BREAKPOINTS,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    CadastroComponent,
    CarrinhoComponent,
    PedidosComponent,
    ProdutosAdminComponent,
    UsuariosAdminComponent,
    ClientesAdminComponent,
    LoginAdminComponent,
    ProdutoCreateComponent,
    ProdutoUpdateComponent,
    ProdutoDeleteComponent,
    CarrinhoUpdateComponent,
    CarrinhoDeleteComponent,
    DetalhePedidoComponent,
    PedidosAdminComponent,
    DetalheAdminPedidoComponent,
    ClienteCreateComponent,
    ClienteUpdateComponent,
    ClienteDeleteComponent,
    UsuarioDeleteComponent,
    UsuarioCreateComponent,
    UsuarioUpdateComponent,
    GerenciarPedidoComponent,
    GerenciarPedidoUpdateComponent,
    HeaderResComponent,
    DetalheProdutoComponent,
    RecuperarSenhaComponent,
    TrocarSenhaComponent,
    RetornoPagamentoComponent,
    BuscaProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatGridListModule,
    BidiModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatBadgeModule,
    MatTooltipModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    LayoutModule,
    MatIconModule,
    MatSlideToggleModule,
    StripeModule.forRoot("pk_live_51KbV8LHNzcCHyrctj4WHtWghkx9kLhhFuarwZW2wo9y2jBX9nRIn1Ibb1HUFejqnYEhAfSOOuqMLAhRADO0FYwf500MZ91OUOf")
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  },
    BreakPointsProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
