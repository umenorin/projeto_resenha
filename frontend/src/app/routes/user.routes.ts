import { Routes } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';
import { SignupComponent } from '../user/signup/signup.component';

export const USER_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  },
  {path:'signup',title:"Singup",component:SignupComponent}
];
