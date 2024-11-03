import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Certifique-se de que ReactiveFormsModule está importado
import { CadastroLivroComponent } from './cadastro-livro.component';

@NgModule({
  declarations: [
    CadastroLivroComponent // Certifique-se de que CadastroLivroComponent está declarado
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule // Certifique-se de que ReactiveFormsModule está importado
  ],
  exports: [
    CadastroLivroComponent // Exporte o CadastroLivroComponent se necessário
  ]
})
export class LivroModule { }