import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-resenha',
  templateUrl: './cadastro-resenha.component.html',
  styleUrls: ['./cadastro-resenha.component.css']
})
export class CadastroResenhaComponent implements OnInit {
  reviewForm: FormGroup;
  genres: string[] = ['Ficção', 'Não-Ficção', 'Romance', 'Fantasia', 'Mistério'];

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      book: ['', Validators.required],
      author: ['', Validators.required],
      edition: [''],
      publisher: [''],
      keywords: [''],
      genre: [''],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.reviewForm.valid) {
      console.log(this.reviewForm.value);
    }
  }
}