import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { map,tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookService {
  private baseUrl: string = "http://localhost:3000/book";

  constructor(private http: HttpClient) {}

  // Método auxiliar para obter cabeçalho com token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    return new HttpHeaders({
      'x-access-token': token || '' // Define o token no cabeçalho 'x-access-token'
    });
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
