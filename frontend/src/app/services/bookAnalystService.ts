import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookAnalyst } from '../models/bookAnalyst';
import { map,tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookAnalystService {
  private baseUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  // Método auxiliar para obter cabeçalho com token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    return new HttpHeaders({
      'x-access-token': token || '' // Define o token no cabeçalho 'x-access-token'
    });
  }

  getBookAnalyst(id: string): Observable<BookAnalyst> {
    return this.http.get<BookAnalyst>(`${this.baseUrl}bookAnalyst/${id}`, { headers: this.getAuthHeaders() });
  }

  createBookAnalyst(userId: string, bookId: string, data: any): Observable<BookAnalyst> {
    return this.http.post<BookAnalyst>(`${this.baseUrl}user/${userId}/${bookId}`, data, { headers: this.getAuthHeaders() });
  }
}
