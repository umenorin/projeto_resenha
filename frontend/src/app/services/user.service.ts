import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { map,tap } from 'rxjs/operators';


@Injectable({providedIn:'root'})
export class UserService{
    private baseUrl = 'http://localhost:3000/user';
    private _currentUser = new BehaviorSubject<User | null>(null); // Inicializa com null
    public currentUser: Observable<User | null> = this._currentUser.asObservable();

    constructor(private http: HttpClient) {

        // Aqui você deve restaurar o usuário logado de algum lugar (ex: localStorage)
        const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (storedUser) {
        this._currentUser.next(storedUser); // Se já estiver logado, emite o usuário
        }
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}`, user);
    }

    login(email: string, password: string): Observable<User> {
        // Exemplo de login simulado
        return this.http.post<User>(`${this.baseUrl}/login`, { email, password })
        .pipe(
            tap((response: any) => {
              const user = response?.objUserRecuperados || response; // Ajuste conforme necessário
              if (user) {
                this._currentUser.next(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
                console.log("Usuário logado com sucesso:", user);
              } else {
                console.error("Erro: estrutura de resposta inesperada", response);
              }
            })
          );
          
      }
    
      logout() {
        this._currentUser.next(null); // Limpa o usuário logado
        localStorage.removeItem('currentUser'); // Remove o usuário do localStorage
      }
}