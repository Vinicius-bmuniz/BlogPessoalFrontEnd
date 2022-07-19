import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  postagem: Postagem = new Postagem
  tema: Tema = new Tema

  listaTemas: Tema[]
  idTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService

  ) { }



  ngOnInit() {
    if (environment.token == '') {
      // alert('Sua sessão expirou!')
      this.router.navigate(['/login'])
    }

    let id = this.route.snapshot.params['id']
    
    this.findPostById(id)

    this.getAllTemas()
  }

  //POSTAGENS
  findPostById(id: number) {
    this.postagemService.getPostById(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  putPost() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem)=> {
      this.postagem = resp
      alert ('Postagem atualizada com sucesso!')
      this.router.navigate (['/home'])
    })
  }

  //TEMAS
  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  

}
