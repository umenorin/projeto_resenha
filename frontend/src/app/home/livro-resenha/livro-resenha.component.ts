import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { ResenhaInformacaoComponent } from '../resenha-informacao/resenha-informacao.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-livro-resenha',
  standalone:true,
  imports:[ResenhaInformacaoComponent,CommonModule],
  templateUrl: './livro-resenha.component.html',
  styleUrls: ['./livro-resenha.component.css']
})
export class LivroResenhaComponent implements OnInit {
  public bookId: string = '';
  public book!: Book;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id') || ''; // Acessa o ID do livro
      console.log('ID do Livro:', this.bookId);
      this.chamaResenha();
    });
  }

  chamaResenha(): void {
    this.bookService.getBook(this.bookId).subscribe(
      (book: any) => {
        this.book = book.objSMessageSRecuperadoS; // Atribui o livro recebido à variável `livro`
        console.log(this.book)
      },
      error => {
        console.error('Erro ao carregar o livro:', error);
      }
    );
  }
  createBookAnalyst(id?: string){
    console.log("função funcionando"+id)
    this.router.navigate([`/home/livros/createBookAnalyst/${id}`])
  }
}
