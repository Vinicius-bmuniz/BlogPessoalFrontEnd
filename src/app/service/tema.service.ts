import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  // linkTema = 'http://localhost:8080/temas'
  linkTema = "http://munizblogpessoal.herokuapp.com/temas"


  constructor(
    private http: HttpClient
  ) { }

  // Criamos um método para salvarmos o token disponível em environment no Header
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token) //Estamos trazendo as configurações de HEADERS para essa váriavel
  }

  // PEGAR TODOS OS TEMAS CADASTRADOS
  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>(this.linkTema, this.token)
  }

  //PEGAR UM TEMA POR ID
  getByIdTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(this.linkTema + `/${id}`, this.token)
  }

  // CADASTRAR UM NOVO TEMA
  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(this.linkTema, tema, this.token)
  }

  //EDITAR UM TEMA
  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(this.linkTema, tema, this.token)
  }

  //DELETAR UM TEMA
  deleteTema(id: number) {
    return this.http.delete(this.linkTema + `/${id}`, this.token)
  }

}
