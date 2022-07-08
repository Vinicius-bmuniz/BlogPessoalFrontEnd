import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  register(usuario: Usuario): Observable<Usuario> {
    //Colocando os parâmetros como a classe Usuario, temos acesso aos atributos da classe Usuario.ts que criamos na model do front
    //Com o Observable<Usuario> estamos definindo que só será aceito a model Usuario
    return this.http.post<Usuario>('http://localhost:8080/usuarios/cadastrar', usuario)
    //O retorno do nosso método é um http.post<Usuario> (endPoint, objeto(que quero enviar))
  }


  login(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuarios/logar', usuarioLogin)
  }

  logado() {
    let ok: boolean = false
    if(environment.token != ''){
      ok = true
    }
    return ok
  }

}
