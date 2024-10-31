import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { BookAnalystService } from '../../services/bookAnalystService';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-createbook-analyst',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './createbook-analyst.component.html',
  styleUrls: ['./createbook-analyst.component.css']
})
export class CreatebookAnalystComponent {
  myForm!: FormGroup;
  successMessage: string = "";
  public bookId: string = '';
  public book!: Book;
  public currentUserId:string = "";
  public hoveredRating = 0;
  stars = Array(5).fill(0);

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private bookAnalystService: BookAnalystService,
    private userService:UserService,
    private router: Router
  ) {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      this.currentUserId = currentUser._id;
    } else {
      console.error('Usuário não encontrado no localStorage');
    }
    
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      titleTS: new FormControl(null, Validators.required),
      contentTS: new FormControl(null, Validators.required),
      ratingTS: new FormControl(null, Validators.required),
    });
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id') || '';
      console.log('ID do Livro:', this.bookId);
      this.chamaResenha();
    });
  }

  chamaResenha(): void {
    this.bookService.getBook(this.bookId).subscribe(
      (book: any) => {
        this.book = book.objSMessageSRecuperadoS;
        console.log(this.book);
      },
      error => {
        console.error('Erro ao carregar o livro:', error);
      }
    );
  }

  onSubmit() {
    if (this.myForm.valid) {
      const newBookAnalyst: any = {
        title: this.myForm.value.titleTS,
        content: this.myForm.value.contentTS,
        rating: this.myForm.value.ratingTS,
      };
      console.log("---- "+this.currentUserId)
      this.bookAnalystService.createBookAnalyst(this.currentUserId, this.book._id, newBookAnalyst).subscribe(
        response => {
          this.successMessage = 'Resenha cadastrada com sucesso!';
          setTimeout("",2000);
          this.userService.getUser(this.currentUserId);
          this.router.navigate([`/home/livros/${this.book._id}`])
        },
        error => {
          console.error('Erro ao cadastrar a resenha:', error);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }

  // Define o valor da avaliação com base no clique
  setRating(value: number): void {
    this.myForm.patchValue({ ratingTS: value }); // Atualiza o valor de ratingTS no formulário
  }

  // Controla o valor de hover ao passar o mouse
  hoverRating(value: number): void {
    this.hoveredRating = value;
  }

  // Restaura o valor de hover quando o mouse sai
  resetHover(): void {
    this.hoveredRating = 0;
  }

  // Obtém a imagem correta para cada estrela (cheia ou vazia)
  getStarImage(index: number): string {
    if (this.hoveredRating > index || this.myForm.value.ratingTS > index) {
      return '../../assets/star_full.png';
    }
    return '../../assets/star_empty.png';
  }
}
