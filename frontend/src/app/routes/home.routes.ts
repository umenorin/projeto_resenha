import { Routes } from '@angular/router';
import { RecomendadoComponent } from '../home/recomendado/recomendado.component';
import { ResenhasComponent } from '../home/resenhas/resenhas.component';
import { LivrosComponent } from '../home/livros/livros.component';
import { BOOK_ROUTES } from './book.route';
import { BookComponent } from '../home/book.component';
import { UpdateBookAnalystComponent } from '../home/update-book-analyst/update-book-analyst.component';

export const HOME_ROUTES: Routes = [
  { path: '', redirectTo: 'recomendacao', pathMatch: 'full' },
  {
    path: 'resenhas',
    title: 'Minhas resenhas',
    component: ResenhasComponent
  },
  {path:'recomendacao',title:"recomendacoes",component:RecomendadoComponent},
  {path:'livros',title:"Livros",children:BOOK_ROUTES,component:BookComponent},
  {path:'update/:userId/:bookAnalystId', title:'Atualizar Resenha', component:UpdateBookAnalystComponent}

];
