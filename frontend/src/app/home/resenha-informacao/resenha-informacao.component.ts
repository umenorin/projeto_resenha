import { Component, Input, OnInit } from '@angular/core';
import { BookAnalyst } from '../../models/bookAnalyst';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-resenha-informacao',
  standalone: true,
  imports: [],
  templateUrl: './resenha-informacao.component.html',
  styleUrl: './resenha-informacao.component.css'
})
export class ResenhaInformacaoComponent implements OnInit{
  @Input() resenha!: any;
  public autor!:User;
  constructor(private userService:UserService){}

  ngOnInit(): void {
    console.log("RESENHA "+this.resenha);
    this.userService.getUser(this.resenha.autor).subscribe(
      (user: any) => {
        this.autor = user.objUsersRecuperados; // Atribui o objeto User resolvido a this.author
        console.log('Autor carregado:', this.autor);
      },
      error => {
        console.error('Erro ao carregar o autor:', error);
      }
    );
  }
  
}
