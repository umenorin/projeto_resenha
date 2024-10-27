import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone:true,
  imports:[RouterLink,RouterLinkActive,RouterOutlet,HttpClientModule],
  template: `<router-outlet></router-outlet>`, // Onde as rotas filhas vão ser renderizadas
})
export class UserComponent {}
