import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class AuthenticationComponent {
  // Implementação do componente de login

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Ação para login
      console.log('Login bem-sucedido!', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched(); // Marca todos os campos para exibir as mensagens de erro
    }
  }
}
