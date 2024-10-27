import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CadastroComponent } from './user/cadastro.component';
import { HeadersComponent } from './header.component'; // Certifique-se de que está importado
import { AuthenticationComponent } from './user/login.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    HeadersComponent, // Adicione o HeadersComponent aqui
    AuthenticationComponent // Adicione o AuthenticationComponent aqui
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
