import { Routes } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';

export const USER_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Autenticação | Signup',
    component: LoginComponent
  }
];
