import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './user/login.component';
import { CadastroComponent } from './user/cadastro.component';
import { CadastroResenhaComponent } from './resenha/cadastro-resenha.component';
import { CadastroLivroComponent } from './livro/cadastro-livro.component';
import { LivrosComponent } from './livro/livros.component';
import { AuthGuard } from './services/auth.guard'; // Importe o AuthGuard
import { RecomendadosComponent } from './livro/recomendados-livro.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recomendados', component: RecomendadosComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'resenhas', component: CadastroResenhaComponent, canActivate: [AuthGuard] }, // Proteja esta rota
  { path: 'cadastro-livro', component: CadastroLivroComponent, canActivate: [AuthGuard] }, // Proteja esta rota
  { path: 'livros', component: LivrosComponent, canActivate: [AuthGuard] }, // Proteja esta rota
  // Outras rotas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}