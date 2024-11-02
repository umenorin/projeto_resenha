import { Component } from "@angular/core";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
    selector:'app-header',
    standalone:true,
    imports: [RouterLink,RouterLinkActive,RouterOutlet],
    templateUrl: './header.component.html',
    styleUrl:'./header.component.css'
})
export class HeadersComponent{
    constructor(private router:Router){}
    logout() {
        // Limpa todos os dados do localStorage
        localStorage.clear();
      
        // Redireciona o usuário para a página de login (ou outra página de logout)
        this.router.navigate(['/user/login']);
      }
      
}