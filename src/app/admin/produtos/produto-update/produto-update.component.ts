import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Produto } from 'src/app/components/produtos/produto.model';
import { FooterComponent } from 'src/app/components/template/footer/footer.component';
import { HeaderData } from 'src/app/components/template/header-res/header-data.model';
import { HeaderService } from 'src/app/components/template/header-res/header.service';
import { ProdutosAdminService } from '../../../components/produtos/produtos-admin.service';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {

  urlImagens = "./assets/"

  // autenticado: boolean = false;
  // perfil: string = '';
  // nome: string = '';

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

  fileFoto: File | null = null
  fileFoto2: File | null = null
  fileFoto3: File | null = null
  fileFoto4: File | null = null
  fileFoto5: File | null = null
  fileFoto6: File | null = null

  constructor(private headerService: HeaderService, private productService: ProdutosAdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log("UPDATE")
    console.log(this.headerService.headerData)
    if (this.headerService.headerData.autenticado && (this.headerService.headerData.perfil == 'admin' || this.headerService.headerData.perfil == 'master')) {
      if (id != null) {
        this.productService.readById(id).subscribe(produto => {
          this.produto = produto
        })
      }
    } else {
      this.router.navigate(['admin'])
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

  updateProduto(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log(this.produto.resumo)
    // console.log(this.produto.foto2)
    if (id != null) {
      this.productService.update(this.produto).subscribe(produto => {
        this.productService.showMessage('Produto atualizado')
        this.router.navigate(['/admin/produtos'])
      })
      // console.log(this.fileFoto)
      // console.log(this.fileFoto2)
      // console.log(this.fileFoto3)
      // console.log(this.fileFoto4)
      // console.log(this.fileFoto5)
      // console.log(this.fileFoto6)
        this.productService.upload(this.fileFoto, this.fileFoto2, this.fileFoto3, this.fileFoto4, this.fileFoto5, this.fileFoto6).subscribe(produto => {
          console.log("upload")
        }, error =>{
          console.log(error)
        })
      
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/produtos'])
  }
}
