import { Routes } from '@angular/router';
import { RecomendadoComponent } from '../home/recomendado/recomendado.component';
import { ResenhasComponent } from '../home/resenhas/resenhas.component';
import { LivrosComponent } from '../home/livros/livros.component';
import { LivroResenhaComponent } from '../home/livro-resenha/livro-resenha.component';
import { CreatebookAnalystComponent } from '../home/createbook-analyst/createbook-analyst.component';
import { UpdateBookAnalystComponent } from '../home/update-book-analyst/update-book-analyst.component';

export const BOOK_ROUTES: Routes = [
  { path: '', title:'Livros', component:LivrosComponent },
 
  {path:':id',title:"Detalhes Livro",component:LivroResenhaComponent},
  {path:'createBookAnalyst/:id', title:'Criar Resenha', component:CreatebookAnalystComponent}

];
