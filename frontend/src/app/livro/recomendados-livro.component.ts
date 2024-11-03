import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-recomendados',
  templateUrl: '../livro/recomendados-livro.component.html',
  styleUrls: ['../livro/recomendados-livro.component.css']
})
export class RecomendadosComponent implements OnInit {
  recommendedBooks: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getRecommendedBooks();
  }

  getRecommendedBooks(): void {
    this.bookService.getRecommendedBooks().subscribe((books) => {
      this.recommendedBooks = books;
    });
  }
}
