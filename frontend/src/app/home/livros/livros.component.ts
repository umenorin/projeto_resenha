import { Component,OnInit  } from '@angular/core';
import { HeadersComponent } from '../../header.component';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common'; // Importar o CommonModule
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [HeadersComponent,CommonModule, RouterModule ],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})
export class LivrosComponent implements OnInit  {
  public booksList: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.bookService.getBooks().subscribe(
      (data: any) => {
        console.log('Dados recebidos:', data); // Para verificar a resposta
        const books: Book[] = data.objSMessageSRecuperadoS; 
        if (Array.isArray(books)) {

          this.booksList = books
          
        } else {
          console.error('Os dados recebidos não são um array:', books);
        }
      },
      error => {
        console.error('Erro ao carregar livros:', error);
      }
    );
  }
}
