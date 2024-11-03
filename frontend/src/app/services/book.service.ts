import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/books'; // URL da API do backend

  constructor(private http: HttpClient) {}

  // Pega todos os livros
  getBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Pega uma análise específica de um livro pelo bookId e bookAId
  getBookReview(bookId: string, bookAId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${bookId}/review/${bookAId}`);
  }

  // Pega todas as análises de um livro pelo bookId
  getAllReviews(bookId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${bookId}/review`);
  }

  // Adiciona um novo livro
  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, book);
  }
  // Os livros recomendados são obtidos a partir da API do backend
  getRecommendedBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recommended`);
  }
}