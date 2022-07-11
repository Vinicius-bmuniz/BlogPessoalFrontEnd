import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteThemesComponent } from './delete/delete-themes/delete-themes.component';
import { PostDeleteComponent } from './delete/post-delete/post-delete.component';
import { EditThemesComponent } from './edit/edit-themes/edit-themes.component';
import { PostEditComponent } from './edit/post-edit/post-edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ThemeComponent } from './theme/theme.component';

const routes: Routes = [
  //Esse serve para redirecionar caso o componente acessado não seja encontrado.
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 

  //ROTAS CADASTRO E LOGAR
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  //ROTAS PÁGINA HOME
  { path: 'home', component: HomeComponent },

  // ROTAS DE TEMAS
  { path: 'themes', component: ThemeComponent },
  { path: 'del-themes/:id', component: DeleteThemesComponent },
  { path: 'edit-themes/:id', component: EditThemesComponent },
  //quado colocamos :id estamos falando que esse id vai ser uma variável

  //POSTAGENS
  {path: 'post-edit/:id', component: PostEditComponent},
  {path: 'post-delete/:id', component: PostDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
