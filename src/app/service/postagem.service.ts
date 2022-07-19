import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  // linkPostagens = 'http://localhost:8080/postagens'
  linkPostagens = "https://munizblogpessoal.herokuapp.com/postagens"

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token) //Estamos trazendo as configurações de HEADERS para essa váriavel
  }


  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(this.linkPostagens, this.token)
  }

  getPostById(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(this.linkPostagens + `/${id}`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>(this.linkPostagens, postagem, this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.put<Postagem>(this.linkPostagens, postagem, this.token)
  }

  deletePost(id: number){
    return this.http.delete(this.linkPostagens + `/${id}`, this.token)
  }

}
