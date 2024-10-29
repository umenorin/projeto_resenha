import { Routes } from '@angular/router';
import { USER_ROUTES } from './user.routes';
import { UserComponent } from '../user/user.component';
import { HOME_ROUTES } from './home.routes';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'user',
    title: 'Autenticação',
    component: UserComponent, // Component pai
    children: USER_ROUTES // Define as rotas filhas
  },
  {
    path: 'home',
    title: 'menu',
    component: HomeComponent, // Component pai
    children: HOME_ROUTES // Define as rotas filhas
  }

];
