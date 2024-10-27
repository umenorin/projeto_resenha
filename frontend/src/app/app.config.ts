import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { MessageService } from './messages/message.services'; // Certifique-se de que o caminho e o nome do arquivo estão corretos

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    MessageService // Forneça o serviço diretamente
  ],
};
