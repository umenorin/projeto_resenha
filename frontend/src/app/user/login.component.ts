import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class AuthenticationComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { // Injeção do serviço AuthService
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Login bem-sucedido!');
          this.router.navigate(['/home']); // Redireciona para a página inicial após o login bem-sucedido
        },
        (error) => {
          console.log('Login falhou!', error);
          // Exibir mensagem de erro ou tomar outra ação
        }
      );
    } else {
      this.loginForm.markAllAsTouched(); // Marca todos os campos para exibir as mensagens de erro
    }
  }
}