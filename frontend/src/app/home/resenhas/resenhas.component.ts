import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { BookAnalyst } from '../../models/bookAnalyst';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookAnalystService } from '../../services/bookAnalystService';

@Component({
  selector: 'app-resenhas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resenhas.component.html',
  styleUrls: ['./resenhas.component.css']
})
export class ResenhasComponent implements OnInit {
  public bookAnalystList: BookAnalyst[] = [];
  public bookList: Book[] = []; 
  public booksMap: { [key: string]: Book } = {}; 
  private _userId:string ="";

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private bookAnalytService: BookAnalystService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (storedUser && storedUser._id) {
      this._userId = storedUser._id;
      this.userService.getBookAnalysts(storedUser._id).subscribe(
        (bookAnalysts: BookAnalyst[]) => {
          this.bookAnalystList = bookAnalysts;
          console.log('Lista de bookAnalyst:', this.bookAnalystList);

          this.bookList = new Array(this.bookAnalystList.length);

          this.bookAnalystList.forEach((analyst, index) => {
            this.bookService.getBook(analyst.book).subscribe(
              (book: any) => {
                this.booksMap[analyst.book] = book.objSMessageSRecuperadoS;
                this.bookList[index] = book.objSMessageSRecuperadoS;
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

  verLivro(id?: string) {
    this.router.navigate([`/home/livros/${id}`]);
  }

  editReview(bookAnalystId: string) {
    console.log("Editando resenha com ID:", bookAnalystId);
    // Redireciona para a página de edição ou abre um modal de edição
    this.router.navigate([`/home/update//${this._userId}/${bookAnalystId}`]);
  }

  deleteReview(bookAnalystId: string) {
    const confirmation = confirm("Você tem certeza que deseja deletar esta resenha?");
    
    if (confirmation) {
      this.bookAnalytService.deleteBookAnalyst(this._userId, bookAnalystId).subscribe(
        () => {
          console.log("Resenha deletada com sucesso.");
          this.bookAnalystList = this.bookAnalystList.filter(item => item._id !== bookAnalystId);
        },
        error => {
          console.error("Erro ao deletar a resenha:", error);
        }
      );
    } else {
      console.log("Ação de exclusão cancelada.");
    }
  }
}
