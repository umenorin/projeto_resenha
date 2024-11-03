import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './user/login.component';
import { CadastroComponent } from './user/cadastro.component';
import { CadastroResenhaComponent } from './resenha/cadastro-resenha.component';
import { CadastroLivroComponent } from './livro/cadastro-livro.component'; // Corrija o caminho de importação
import { LivrosComponent } from './livro/livros.component'; // Corrija o caminho de importação

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'resenhas', component: CadastroResenhaComponent },
  { path: 'cadastro-livro', component: CadastroLivroComponent }, // Adicione a rota para cadastro de livro
  { path: 'livros', component: LivrosComponent }, // Adicione a rota para exibição de livros
  // Outras rotas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }