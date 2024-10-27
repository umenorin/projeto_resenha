import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  isLoading = false;

  constructor(private userService: UserService) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.isLoading = true;
      this.userService.register(form.value).subscribe(
        response => {
          this.isLoading = false;
          alert('Cadastro realizado com sucesso!');
        },
        error => {
          this.isLoading = false;
          console.error('Erro ao cadastrar usuário', error);
          alert('Erro ao cadastrar usuário');
        }
      );
    }
  }
}
