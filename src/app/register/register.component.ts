import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  usuario: Usuario = new Usuario() //Colocamos new usuario para criar um novo objeto todas as vezes que executarmos o método
  ConfirmSenha: string
  TipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
    //Com o "private authService: AuthService" temos acesso aos métodos da nossa classe service, ou seja, iremos salvar todos os métodos do nosso auth.service na variável AuthService
    //É quase como uma injeção de dependencias
    //Com o "private router: Router" estamos injetando as rotas internas da nossa aplicação

  ) { }

  //Com o "ngOnInit(): void {}" estamos iniciando a aplicação de modo vazio
  //Com o "ngOnInit() {window.scroll(0,0)}" Estamos definindo que ao iniciar a página estaremos no x:0 e y:0
  ngOnInit() {
    window.scroll(0, 0)
  }

  //Método de confirmar senha | é um evento
  confirmarSenha(event: any) {
    this.ConfirmSenha = event.target.value //Estamos pegando o valor desse evento (do input) e gravando na variavel confirmSenha
  }

  tipoUser(event: any) {
    this.TipoUsuario = event.target.value
  }

  //Esse método se conecta com nosso auth.service e ele se conecta com nosso backend
  cadastrar() {
    this.usuario.tipo = this.TipoUsuario //Estamos definindo que o atributo do objeto usuario é = atributo TipoUsuario criado nessa classe e populado pelo método.
    
    if (this.usuario.senha != this.ConfirmSenha) {
      alert('Senhas diferentes!')
    } else {
      this.authService.register(this.usuario).subscribe((resp: Usuario) => {
        //Esse subscribe transforma nossas informações em modelo JSON para ser enviados ao nosso BackEnd
        //A resp retorna as informações da nossa model
        this.usuario = resp
        this.router.navigate(['/login'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }


}