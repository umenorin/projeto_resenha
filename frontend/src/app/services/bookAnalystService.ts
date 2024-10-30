import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { BookAnalyst } from '../models/bookAnalyst';

@Injectable({providedIn:'root'})
export class BookAnalystService{
    private baseUrl:string = "http://localhost:3000/";

    constructor(private http: HttpClient) {}

    
    getBookAnalyst(id:string): Observable<BookAnalyst> {
      return this.http.get<BookAnalyst>(this.baseUrl+`bookAnalyst/${id}`);
    }
    createBookAnalyst(userId:string,bookId:string,data:any){
      return this.http.post<BookAnalyst>(this.baseUrl+`user/${userId}/${bookId}`,data)
    }
}