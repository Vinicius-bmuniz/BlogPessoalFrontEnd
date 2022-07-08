import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  tema: Tema = new Tema()
  listTema: Tema[]


  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit() {
    // Com essa validação, ao entrar na página de tema, ele verifica se o usuario verifica se ele tem o token se não tiver ele volta para home.
    if (environment.token == '') {
      // alert('Sua sessão expirou!')
      this.router.navigate(['/home'])
    }

    this.findAllTema() //Sempre que iniciarmos a página, ele irá aparecer a lista de temas.

  }

  // CADASTRAR UM NOVO TEMA
  CadastrarTema() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert('Tema criado com sucesso')
      this.findAllTema()
      this.tema = new Tema //Criamos um novo tema para zerar o objeto
    })
  }

  // BUSCAR TODOS OS TEMAS
  findAllTema() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listTema = resp
    })
  }


}
