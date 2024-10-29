import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeadersComponent } from '../header.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, HttpClientModule, HeadersComponent],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class BookComponent {}
