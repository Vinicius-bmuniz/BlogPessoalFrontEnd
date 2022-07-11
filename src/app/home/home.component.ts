import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postagem: Postagem = new Postagem() //Cria um novo objeto do tipo postagem
  tema: Tema = new Tema() //Cria um novo objeto do tipo Tema
  user: Usuario = new Usuario() //Cria um novo objeto do tipo Tema

  listaPostagem: Postagem[] //Armazena a lista de Postagens nessa variavel
  listaTemas: Tema[] //Armazena a lista de temas nessa variavel
  idTema: number //Pega o id do tema colocado no input
  idUser = environment.id //Variavel apra salvar o Id do usuario

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService

  ) { }

  ngOnInit() {
    if (environment.token == '') {
      // alert('Sua sessão expirou!')
      this.router.navigate(['/login'])
    }

    this.getAllTemas()
    this.getAllPostagens()
  }

  //========== TEMAS ==========//
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

  //========== POSTAGENS ==========//
  getByUserId(){
    this.authService.getUserById(this.idUser).subscribe((resp: Usuario)=>{
      this.user = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp : Postagem[])=>{
      this.listaPostagem = resp
    })
  }

  postPostagem() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user //Com isso eu pego o usuário acima que foi achado pelo ID

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem criada com sucesso!!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

}
