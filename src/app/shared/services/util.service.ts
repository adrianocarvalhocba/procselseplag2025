import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ETipoMensagem } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private readonly toastrService = inject(ToastrService);

  opcoes = {
    timeOut: 5000,
    progressBar: true,
    closeButton: true,
  };

  mensagem(tipo: ETipoMensagem, mensagem: string) {
    if (tipo === ETipoMensagem.ERROR) {
      this.toastrService.error(mensagem, 'Erro', this.opcoes);
    }

    if (tipo === ETipoMensagem.SUCCESS) {
      this.toastrService.success(mensagem, 'Sucesso', this.opcoes);
    }
  }
}
