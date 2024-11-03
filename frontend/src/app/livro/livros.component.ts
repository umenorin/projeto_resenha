import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivrosComponent implements OnInit {
  livros: any[] = [];
  bookForm: FormGroup;

  constructor(private bookService: BookService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      edition: ['', Validators.required],
      publisher: ['', Validators.required],
      gender: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchLivros();
  }

  fetchLivros(): void {
    this.bookService.getBooks().subscribe(
      (response) => {
        this.livros = response.objSMessageSRecuperadoS;
      },
      (error) => {
        console.error('Erro ao buscar livros:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe(response => {
        console.log('Livro salvo com sucesso!', response);
        this.bookForm.reset();
        this.fetchLivros(); // Atualiza a lista de livros após o cadastro
      }, error => {
        console.error('Erro ao salvar o livro:', error);
      });
    }
  }
}