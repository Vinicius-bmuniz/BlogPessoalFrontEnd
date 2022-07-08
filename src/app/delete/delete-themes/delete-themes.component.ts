import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-delete-themes',
  templateUrl: './delete-themes.component.html',
  styleUrls: ['./delete-themes.component.css']
})
export class DeleteThemesComponent implements OnInit {

  tema: Tema = new Tema()
  temaID: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      // alert('Sua sessão expirou!')
      this.router.navigate(['/login'])
    }

    //ESSA VÁRIAVEL PEGA O ID QUE COLOCAMOS NO APP-ROUTING.MODULE
    //EM { path: 'edit-themes/:id', component: EditThemesComponent}
    this.temaID = this.route.snapshot.params['id']
    this.findByIdTema(this.temaID)
  }


  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  deleteTema() {
    this.temaService.deleteTema(this.temaID).subscribe(()=>{
      alert('Tema apagado com sucesso!')
      this.router.navigate(['/themes'])
    })
  }


}
