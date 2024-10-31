import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUser = {
    email: 'test@example.com',
    password: 'password123'
  };

  login(email: string, password: string): Observable<boolean> {
    if (email === this.mockUser.email && password === this.mockUser.password) {
      return of(true); // Simula um login bem-sucedido
    } else {
      return of(false); // Simula um login falho
    }
  }
}
