import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({providedIn:'root'})
export class BookService{
    private baseUrl:string = "http://localhost:3000/book";

    constructor(private http: HttpClient) {}

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.baseUrl);
      }
    getBook(id:string): Observable<Book> {
      return this.http.get<Book>(this.baseUrl+`/${id}`);
    }
}