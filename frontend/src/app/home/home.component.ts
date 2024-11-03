import { Component, OnInit } from '@angular/core';
import { BookService } from './../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: any = [];
  filteredBooks: any = [];
  searchTerm: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data.objBooksRecuperados;
      this.filteredBooks = data.objBooksRecuperados;
    });
  }

  filterBooks(term: string): void {
    this.filteredBooks = this.books.filter((book: any) =>
      book.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}