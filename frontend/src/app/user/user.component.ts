import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone:true,
  imports:[RouterLink,RouterLinkActive,RouterOutlet],
  template: `<router-outlet></router-outlet>`, // Onde as rotas filhas vão ser renderizadas
})
export class UserComponent {}
