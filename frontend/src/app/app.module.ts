import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CadastroComponent } from './user/cadastro.component';
import { HeadersComponent } from './header.component';
import { AuthenticationComponent } from './user/login.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    HeadersComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] // Ensure AppComponent is bootstrapped here
})
export class AppModule { }
