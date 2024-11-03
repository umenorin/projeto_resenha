import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CadastroResenhaComponent } from './resenha/cadastro-resenha.component';
import { LivrosComponent } from './livro/livros.component';
import { HeaderComponent } from './header/header.component'; // Corrija o caminho de importação
import { AuthenticationComponent } from './user/login.component';
import { CadastroComponent } from './user/cadastro.component';
import { LivroModule } from './livro/livro.module'; // Importe o LivroModule

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroResenhaComponent,
    LivrosComponent,
    HeaderComponent, // Certifique-se de que HeaderComponent está declarado
    AuthenticationComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, // Certifique-se de que ReactiveFormsModule está importado
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    AppRoutingModule,
    RouterModule,
    LivroModule // Importe o LivroModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Inclua CUSTOM_ELEMENTS_SCHEMA aqui
})
export class AppModule { }