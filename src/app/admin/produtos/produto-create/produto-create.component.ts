import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/components/produtos/produto.model';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { ProdutosAdminService } from '../../../components/produtos/produtos-admin.service';


@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  fileFoto: File | null = null
  fileFoto2: File | null = null
  fileFoto3: File | null = null
  fileFoto4: File | null = null
  fileFoto5: File | null = null
  fileFoto6: File | null = null

  urlImagens = "./assets/"

  produto: Produto = {
    nome: '',
    idCobranca: '',
    preco: 0,
    resumo: '',
    autor: '',
    ativo: false,
    estoque: 0,
    foto: 'na',
    foto2: 'na',
    foto3: 'na',
    foto4: 'na',
    foto5: 'na',
    foto6: 'na'
  }

  isAtivo = 'Não';

  constructor(private headerService: HeaderService, private produtoService: ProdutosAdminService, private router: Router) { }

  ngOnInit(): void {
    if (!this.headerService.headerData.autenticado || (this.headerService.headerData.perfil != 'admin' && this.headerService.headerData.perfil != 'master')) {
      this.router.navigate(['admin'])
    }
  }

  criarProduto(): void {

    if (this.produto.nome == "") {
      this.produtoService.showMessage("Campo NOME não pode ser vazio")
      this.router.navigate(['admin/produtos/create'])
    } else if (this.produto.preco == 0) {
      this.produtoService.showMessage("Campo PREÇO não pode ser vazio")
      this.router.navigate(['admin/produtos/create'])
    } else if (this.produto.resumo == '') {
      this.produtoService.showMessage("Campo DESCRIÇÃO não pode ser vazio")
      this.router.navigate(['admin/produtos/create'])
    } else {
      this.produtoService.create(this.produto).subscribe(() => {
        this.produtoService.showMessage("Produto criado")
      });
      if (this.fileFoto != null ) {
        console.log("antes do UPLOAD NO FRONT")
        this.produtoService.upload(this.fileFoto, this.fileFoto2, this.fileFoto3, this.fileFoto4, this.fileFoto5,this.fileFoto6 )
        // .subscribe(() => {
        //   console.log("fotos atualizadas")
        // })
      }
      this.router.navigate(['admin/produtos/'])
    }
  }

  onChangeFoto(files: FileList | null): void {
    if (files != null) {
      this.produto.foto = this.urlImagens + files[0].name
      console.log(this.produto.foto)
      this.fileFoto = files[0]
    }
  }

  onChangeFoto2(files: FileList | null): void {
    if (files != null) {
      this.produto.foto2 = this.urlImagens + files[0].name
      console.log(this.produto.foto2)
      this.fileFoto2 = files[0]
    }
  }

  onChangeFoto3(files: FileList | null): void {
    if (files != null) {
      this.produto.foto3 = this.urlImagens + files[0].name
      console.log(this.produto.foto3)
      this.fileFoto3 = files[0]
    }
  }

  onChangeFoto4(files: FileList | null): void {
    if (files != null) {
      this.produto.foto4 = this.urlImagens + files[0].name
      console.log(this.produto.foto4)
      this.fileFoto4 = files[0]
    }
  }

  onChangeFoto5(files: FileList | null): void {
    if (files != null) {
      this.produto.foto5 = this.urlImagens + files[0].name
      console.log(this.produto.foto5)
      this.fileFoto5 = files[0]
    }
  }

  onChangeFoto6(files: FileList | null): void {
    if (files != null) {
      this.produto.foto6 = this.urlImagens + files[0].name
      console.log(this.produto.foto6)
      this.fileFoto6 = files[0]
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/produtos'])
  }
}
