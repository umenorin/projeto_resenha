import { Component,OnInit  } from '@angular/core';
import { HeadersComponent } from '../../header.component';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common'; // Importar o CommonModule
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-recomendado',
  standalone: true,
  imports: [HeadersComponent,CommonModule, RouterModule ],
  templateUrl: './recomendado.component.html',
  styleUrl: './recomendado.component.css'
})
export class RecomendadoComponent implements OnInit  {
  public sciFiBooks: Book[] = [];
  public romanceBooks: Book[] = [];
  public adventureBooks: Book[] = [];
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
          // Função para pegar quatro livros aleatórios de um array
          const getRandomBooks = (booksArray: Book[], count: number): Book[] => {
            // Embaralhar os livros
            const shuffled = booksArray.sort(() => 0.5 - Math.random());
            // Retornar os primeiros 'count' livros do array embaralhado
            return shuffled.slice(0, count);
          };
  
          // Obter 4 livros aleatórios para cada gênero
          this.sciFiBooks = getRandomBooks(books.filter(book => book.gender === 'Ficção Científica'), 4);
          this.romanceBooks = getRandomBooks(books.filter(book => book.gender === 'Romance'), 4);
          this.adventureBooks = getRandomBooks(books.filter(book => book.gender === 'Aventura'), 4);
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
