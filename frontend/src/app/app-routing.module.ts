import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './user/cadastro.component';
import { AuthenticationComponent } from './user/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.components';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: '', redirectTo: '/cadastro', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
