import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeadersComponent } from '../header.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, HttpClientModule, HeadersComponent],
  template: `
    <app-header></app-header>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .horizontal-line {
      height: 5px;               /* Espessura da linha */
      background-color: #FF5733; /* Cor da linha */
      width: 100%;               /* Largura total */
      margin: 20px 0;            /* Espaçamento acima e abaixo */
    }
  `]
})
export class HomeComponent {}
