import { Routes } from '@angular/router';
import { USER_ROUTES } from './user.routes';
import { UserComponent } from '../user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'user',
    title: 'Autenticação',
    component: UserComponent, // Component pai
    children: USER_ROUTES // Define as rotas filhas
  }
];
