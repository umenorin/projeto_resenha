import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user/signin'; // Certifique-se de que esta URL está correta

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    return !!localStorage.getItem('token'); // Example implementation
  }
}