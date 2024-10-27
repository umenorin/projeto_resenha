import { Routes } from '@angular/router';

import { MessageComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.components';
import { AUTH_ROUTES } from './auth/auth.roulers';

export const routes: Routes = [
    {path: '', redirectTo:'mensagens', pathMatch:'full'},
    {path: 'mensagens', 'title':'Mensagens', component:MessageComponent},
    {path: 'user', 'title':'Autenticação',children: AUTH_ROUTES,component:AuthenticationComponent},
    {path:'**',component:PageNotFoundComponent}
];
 