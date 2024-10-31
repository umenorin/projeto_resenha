import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../../services/user.service";  // Ajuste o caminho conforme necessário
import { Router } from "@angular/router";  // Importa o serviço de roteamento
import { CommonModule } from "@angular/common";
@Component({
    selector: 'app-signup',
    standalone: true,
    imports:[ReactiveFormsModule,CommonModule],
    templateUrl: './signup.component.html',
    styleUrls:['./signup.component.css']
})
export class SignupComponent implements OnInit{
    myForm!: FormGroup;
    successMessage: string  = "";  // Variável para armazenar a mensagem de sucesso

    constructor(private userService: UserService, private router:Router) {}

    onLogin(){
        this.router.navigate([`/user/login`])
    }

    onSubmit() {
        if (this.myForm.valid) {
            const newUser = {
                name: this.myForm.value.nameTS,
                email: this.myForm.value.emailTS,
                password: this.myForm.value.passwordTS,
                bookAnalyst: []
            };
            this.userService.createUser(newUser).subscribe({
                next: () => {
                    this.successMessage = "Usuário cadastrado com sucesso!";
                    
                    // Define o redirecionamento após 2 segundos
                    setTimeout(() => {
                        this.router.navigate(['/user/login']);  // Navega para a página de login
                    }, 2000);
                },
                error: (err) => {
                    console.error('Erro ao criar o usuário:', err);
                }
            });
        } else {
            console.log('Formulário inválido');
        }
    }


    ngOnInit(){
        this.myForm = new FormGroup({
            nameTS: new FormControl(null, Validators.required),
            emailTS: new FormControl(null, [Validators.required, Validators.email]),
            passwordTS: new FormControl(null, Validators.required),
            confirmPasswordTS: new FormControl(null, Validators.required),
            termsAcceptedTS: new FormControl(false, Validators.requiredTrue)
        }, { validators: this.passwordMatchValidator() });
    }

    // Validador de correspondência de senha
    passwordMatchValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const group = control as FormGroup;
            const password = group.get('passwordTS')?.value;
            const confirmPassword = group.get('confirmPasswordTS')?.value;
            return password === confirmPassword ? null : { passwordMismatch: true };
        };
    }
}
