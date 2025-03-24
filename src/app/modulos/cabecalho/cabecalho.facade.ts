import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ETipoMensagem } from '../../shared/enums';
import { Estatisticas } from '../../shared/models/estatisticas.model';
import { AbitusService } from '../../shared/services/abitus.service';
import { UtilService } from '../../shared/services/util.service';
import { CabecalhoState } from './cabecalho.state';

@Injectable({ providedIn: 'root' })
export class CabecalhoFacade {
  private readonly _abitusService = inject(AbitusService);
  private readonly _cabecalhoState = inject(CabecalhoState);
  private readonly _utilService = inject(UtilService);

  estatisticas$!: Observable<Estatisticas>;

  constructor() {
    this.estatisticas$ = this._cabecalhoState.estatisticas$;
  }

  carregaEstatisticas() {
    this._abitusService.buscaEstatisticas().subscribe({
      next: (res: Estatisticas) => {
        this._cabecalhoState.estatisticas = res;
      },
      error: () =>
        this._utilService.mensagem(
          ETipoMensagem.ERROR,
          `Erro ao carregar valores das estatísticas!`
        ),
    });
  }
}
