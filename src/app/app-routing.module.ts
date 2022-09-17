import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { CadastroComponent }from './views/login/cadastro/cadastro.component';
import { CarrinhoComponent } from './views/carrinho/carrinho.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { DetalheProdutoComponent } from './views/detalhe-produto/detalhe-produto.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { ProdutosAdminComponent } from './admin/produtos/produto-admin.component';
import { ClientesAdminComponent } from './admin/clientes/clientes.component';
import { UsuariosAdminComponent } from './admin/usuarios/usuarios.component';
import { ProdutoCreateComponent } from './admin/produtos/produto-create/produto-create.component';
import { ProdutoUpdateComponent } from './admin/produtos/produto-update/produto-update.component';
import { ProdutoDeleteComponent } from './admin/produtos/produto-delete/produto-delete.component';
import { CarrinhoUpdateComponent } from './views/carrinho/carrinho-update/carrinho-update.component';
import { CarrinhoDeleteComponent } from './views/carrinho/carrinho-delete/carrinho-delete.component';
import { DetalhePedidoComponent } from './views/pedidos/detalhe-pedido/detalhe-pedido.component';
import { PedidosAdminComponent } from './admin/pedidos/pedidos.component';
import { DetalheAdminPedidoComponent } from './admin/pedidos/detalhe-pedido/detalhe-pedido.component';
import { ClienteDeleteComponent } from './admin/clientes/cliente-delete/cliente-delete.component';
import { ClienteCreateComponent } from './admin/clientes/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './admin/clientes/cliente-update/cliente-update.component';
import { UsuarioUpdateComponent } from './admin/usuarios/usuario-update/usuario-update.component';
import { UsuarioDeleteComponent } from './admin/usuarios/usuario-delete/usuario-delete.component';
import { UsuarioCreateComponent } from './admin/usuarios/usuario-create/usuario-create.component';
import { GerenciarPedidoComponent } from './admin/pedidos/gerenciar-pedido/gerenciar-pedido.component';
import { GerenciarPedidoUpdateComponent } from './admin/pedidos/gerenciar-pedido-update/gerenciar-pedido-update.component';
import { RecuperarSenhaComponent } from './views/login/recuperar-senha/recuperar-senha.component';
import { TrocarSenhaComponent } from './views/login/trocar-senha/trocar-senha.component';
import { RetornoPagamentoComponent } from './views/carrinho/retorno-pagamento/retorno-pagamento.component';
import { MenuComponent } from './views/menu/menu.component';
import { BuscaProdutoComponent } from './views/home/busca-produto/busca-produto.component';

const routes: Routes = [{
  path: "",
  component: HomeComponent
},
{
  path: "menu",
  component: MenuComponent
},
{
  path: "buscaProduto",
  component: BuscaProdutoComponent
},
{
  path: "cadastro",
  component: CadastroComponent
},
{
  path: "login",
  component: LoginComponent
},
{
  path: "recuperarSenha",
  component: RecuperarSenhaComponent
},
{
  path: "retornoPagamento",
  component: RetornoPagamentoComponent
},
{
  path: "trocarSenha/:CPF",
  component: TrocarSenhaComponent
},
{
  path: "carrinho",
  component: CarrinhoComponent
},
{
  path: "carrinho/update",
  component: CarrinhoUpdateComponent
},
{
  path: "carrinho/delete",
  component: CarrinhoDeleteComponent
},
{
  path: "pedidos",
  component: PedidosComponent
},
{
  path: "pedidos/detalhe/:id",
  component: DetalhePedidoComponent
},
{
  path: "detalheProduto/:id",
  component: DetalheProdutoComponent
},
{
  path: "admin/produtos/create",
  component: ProdutoCreateComponent
},
{
  path: "admin/produtos/update/:id",
  component: ProdutoUpdateComponent
},
{
  path: "admin/produtos/delete/:id",
  component: ProdutoDeleteComponent
},
{
  path: "admin",
  component: LoginAdminComponent
},
{
  path: "admin/produtos",
  component: ProdutosAdminComponent
},
{
  path: "admin/clientes",
  component: ClientesAdminComponent
},
{
  path: "admin/clientes/create",
  component: ClienteCreateComponent
},
{
  path: "admin/clientes/update/:id",
  component: ClienteUpdateComponent
},
{
  path: "admin/clientes/delete/:id",
  component: ClienteDeleteComponent
},
{
  path: "admin/pedidos",
  component: PedidosAdminComponent
},
{
  path: "admin/pedidos/detalhe/:id",
  component: DetalheAdminPedidoComponent
},
{
  path: "admin/pedidos/gerenciar",
  component: GerenciarPedidoComponent
},
{
  path: "admin/pedidos/update",
  component: GerenciarPedidoUpdateComponent
},
{
  path: "admin/usuarios",
  component: UsuariosAdminComponent
},
{
  path: "admin/usuarios/update/:id",
  component: UsuarioUpdateComponent
},
{
  path: "admin/usuarios/delete/:id",
  component: UsuarioDeleteComponent
},
{
  path: "admin/usuarios/create",
  component: UsuarioCreateComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
