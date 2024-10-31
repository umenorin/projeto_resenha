import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { BookAnalyst } from '../../models/bookAnalyst';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resenhas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resenhas.component.html',
  styleUrls: ['./resenhas.component.css']
})
export class ResenhasComponent implements OnInit {
  public bookAnalystList: BookAnalyst[] = [];
  public bookList: Book[] = []; // Nova lista para armazenar livros
  public booksMap: { [key: string]: Book } = {}; // Armazena cada livro pelo ID

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (storedUser && storedUser._id) {
      this.userService.getBookAnalysts(storedUser._id).subscribe(
        (bookAnalysts: BookAnalyst[]) => {
          this.bookAnalystList = bookAnalysts;
          console.log('Lista de bookAnalyst:', this.bookAnalystList);

          // Inicializa a bookList com o mesmo tamanho que bookAnalystList
          this.bookList = new Array(this.bookAnalystList.length);

          // Para cada analyst, buscar o livro pelo ID
          this.bookAnalystList.forEach((analyst, index) => {
            this.bookService.getBook(analyst.book).subscribe(
              (book: any) => {
                this.booksMap[analyst.book] = book.objSMessageSRecuperadoS; // Armazena o livro com o ID
                this.bookList[index] = book.objSMessageSRecuperadoS; // Adiciona o livro na mesma posição
                console.log(this.bookList[index])
              },
              error => {
                console.error('Erro ao carregar o livro:', error);
              }
            );
          });
        },
        error => {
          console.error('Erro ao carregar a lista de bookAnalyst:', error);
        }
      );
    } else {
      console.error('Nenhum usuário logado encontrado.');
    }
  }

  verLivro(id:string){
    this.router.navigate([`/home/livros/${id}`])
  }
}
