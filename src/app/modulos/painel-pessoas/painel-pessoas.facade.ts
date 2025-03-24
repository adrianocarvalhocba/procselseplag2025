import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ETipoMensagem } from '../../shared/enums';
import { Pessoa, ResponsePessoas } from '../../shared/models/pessoas.models';
import { AbitusService } from '../../shared/services/abitus.service';
import { UtilService } from '../../shared/services/util.service';
import { PainelPessoasState } from './painel-pessoas.state';

@Injectable({ providedIn: 'root' })
export class PainelPessoasFacade {
  private readonly _router = inject(Router);
  private readonly _abitusService = inject(AbitusService);
  private readonly _painelPessoasState = inject(PainelPessoasState);
  private readonly _utilService = inject(UtilService);

  carregandoListaPessoas$!: Observable<boolean>;
  listaPessoas$!: Observable<ResponsePessoas>;

  constructor() {
    this.carregandoListaPessoas$ =
      this._painelPessoasState.carregandoListaPessoas$;
    this.listaPessoas$ = this._painelPessoasState.listaPessoas$;
  }

  carregaListaPessoas(parametros: HttpParams) {
    this._painelPessoasState.carregandoListaPessoas = true;

    this._abitusService.listaPessoas(parametros).subscribe({
      next: (res: ResponsePessoas) => {
        this._painelPessoasState.listaPessoas = res;
      },
      error: () =>
        this._utilService.mensagem(
          ETipoMensagem.ERROR,
          `Erro ao carregar a lista das pessoas!`
        ),
      complete: () => {
        this._painelPessoasState.carregandoListaPessoas = false;
      },
    });
  }

  getPessoa(idPessoa: number): Pessoa {
    return this._painelPessoasState.listaPessoas.content.find(
      (pessoa) => pessoa.id === idPessoa
    ) as Pessoa;
  }
}
