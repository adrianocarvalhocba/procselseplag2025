import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ETipoMensagem } from '../../shared/enums';
import { Foto } from '../../shared/models/foto.model';
import { Pessoa, ResponsePessoas } from '../../shared/models/pessoas.model';
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

  salvaInformacoes(formDados: any, anexos: Foto[]): Observable<boolean> {
    const resultado = new Subject<boolean>();

    this._abitusService.salvaInformacoes(formDados, anexos).subscribe({
      error: (erro) => {
        this._utilService.mensagem(
          ETipoMensagem.ERROR,
          `Erro ao salvar as informações da pessoa: ${erro.message}`
        );

        resultado.next(false);
        resultado.complete();
      },
      complete: () => {
        this._utilService.mensagem(
          ETipoMensagem.SUCCESS,
          `Informações salvas com sucesso!`
        );

        resultado.next(true);
        resultado.complete();
      },
    });

    return resultado;
  }
}
