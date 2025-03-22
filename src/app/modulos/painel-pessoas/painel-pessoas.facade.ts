import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePessoas } from '../../models/pessoas.models';
import { AbitusService } from '../../services/abitus.service';
import { PainelPessoasState } from './painel-pessoas.state';

@Injectable({ providedIn: 'root' })
export class PainelPessoasFacade {
  private readonly _abitusService = inject(AbitusService);
  private readonly _painelPessoasState = inject(PainelPessoasState);

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
      error: (erro) => {
        console.error(erro);
      },
      complete: () => {
        this._painelPessoasState.carregandoListaPessoas = false;
      },
    });
  }
}
