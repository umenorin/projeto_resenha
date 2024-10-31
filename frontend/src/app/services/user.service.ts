import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { map,tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class UserService{
    private baseUrl = 'http://localhost:3000/user';
    private _currentUser = new BehaviorSubject<User | null>(null); // Inicializa com null
    public currentUser: Observable<User | null> = this._currentUser.asObservable();
    private token: string | null = null;

    constructor(private http: HttpClient) {

        // Aqui você deve restaurar o usuário logado de algum lugar (ex: localStorage)
        const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (storedUser) {
        this._currentUser.next(storedUser); // Se já estiver logado, emite o usuário
        }
    }
    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token'); // Obtém o token do localStorage
      return new HttpHeaders({
        'x-access-token': token || '' // Define o token no cabeçalho 'x-access-token'
      });
    }

    getUser(id: string): Observable<User> {
      return this.http.get<{ objUsersRecuperados: User }>(`${this.baseUrl}/${id}`,).pipe(
        map(response => {
          const user = response.objUsersRecuperados;
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }),
        tap(user => console.log("Dados do usuário recuperado:", user))
      );
    }
    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}`, user);
    }

    getBookAnalysts(userId:string): Observable<any>{
      return this.http.get<{ objReviewsRecuperados: User }>(`${this.baseUrl}/${userId}/review`,{ headers: this.getAuthHeaders() }).pipe(
        map(response => {
          const bookAnalystList = response.objReviewsRecuperados;
          return bookAnalystList;
        }),
        tap(bookAnalystList => console.log("Dados das resenhas recuperado:", bookAnalystList))
      );
    }

    login(email: string, password: string): Observable<{ token: string }> {
        console.log("Método login chamado no UserService");
        return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password })
            .pipe(
                tap((response) => {
                    this.token = response.token;  // Armazena o token recebido
    
                    if (this.token) {

                      const decodedToken = this.decodeJwt(this.token) as User;
                      console.log("Token decodificado:", decodedToken);
                      this._currentUser.next(decodedToken);
                      localStorage.setItem('token', this.token);
                      localStorage.setItem('currentUser', JSON.stringify(decodedToken));
                        console.log("Usuário logado com sucesso:", decodedToken);
                    } else {
                        console.error("Erro: estrutura de resposta inesperada", response);
                    }
                })
            );
    }
    
  
    // Método para retornar o token JWT quando necessário, por exemplo, em um interceptor HTTP
    getToken(): string | null {
      return this.token;
    }
    
    logout() {
      this._currentUser.next(null); // Limpa o usuário logado
      localStorage.removeItem('currentUser'); // Remove o usuário do localStorage
    }

    decodeJwt(token: string): any {
      // Divide o token em partes
      const base64Url = token.split('.')[1];  // A segunda parte é o payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  
      // Decodifica de Base64 para string
      const jsonPayload = decodeURIComponent(
          atob(base64)
              .split('')
              .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
      );
  
      return JSON.parse(jsonPayload);  // Retorna o payload como um objeto JSON
  }
  
}