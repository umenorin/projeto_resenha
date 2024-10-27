import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/user';
  private _currentUser = new BehaviorSubject<User | null>(null); // Inicializa com null
  public currentUser: Observable<User | null> = this._currentUser.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieServicnpm ) {
    // Restaura o usuário logado do localStorage, se existir
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (storedUser) {
      this._currentUser.next(storedUser);
    }
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${this.baseUrl}/signin`, { email, password })
      .pipe(
        tap((response: any) => {
          const user = response.objUserRecuperados;  // Acessa o usuário
          const token = response.token;  // Recebe o token JWT

          // Atualiza o BehaviorSubject com o usuário logado
          this._currentUser.next(user);

          // Armazena o token JWT no cookie
          this.cookieService.set('jwt', token, 1, '/'); // Expiração de 1 dia (ou ajuste conforme necessário)

          // Salva o usuário no localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));

          console.log("Usuário logado com sucesso:", user);
        })
      );
  }

  logout() {
    this._currentUser.next(null); // Limpa o usuário logado
    localStorage.removeItem('currentUser'); // Remove o usuário do localStorage
    this.cookieService.delete('jwt', '/'); // Remove o token JWT do cookie
  }

  // Exemplo de função para acessar o token do cookie
  getToken(): string {
    return this.cookieService.get('jwt');
  }
}
