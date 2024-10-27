import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SigninComponent } from './auth/signin.component'; // Importe o SigninComponent
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { HeadersComponent } from './header.component';
import { Message } from './messages/message.model'; // Add this line to import Message

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    SigninComponent, // Adicione o SigninComponent aos imports
    MessageComponent,
    MessageListComponent,
    MessageInputComponent,
    HeadersComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "front-end";

  mostrarElemento: boolean = true;
  onMudaMostrarElemento() {
    this.mostrarElemento = !this.mostrarElemento;
  }

  messageBiding: Message = new Message("Texto da mensagem via Input", "ViniciusROsalen");
  messageS: Message[] = [
    new Message("Texto 01", "ViniciusROsalen"),
    new Message("Texto 02", "ViniciusRsalen"),
    new Message("Texto 03", "ViniusROsalen")
  ];

  // Método para lidar com eventos emitidos do componente filho
  handleOutputMessage(content: string, msg: Message) {
    // Atualiza o conteúdo da mensagem
    msg.content = content;
    console.log('Message updated:', msg);
  }
}
