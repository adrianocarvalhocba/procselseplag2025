import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponsePessoas } from '../../shared/models/pessoas.models';

@Injectable({ providedIn: 'root' })
export class PainelPessoasState {
  private readonly _carregandoListaPessoas$ = new BehaviorSubject<boolean>(
    false
  );
  private readonly _listaPessoas$ = new BehaviorSubject<ResponsePessoas>(
    {} as ResponsePessoas
  );

  //
  // carregandoListaPessoas
  //
  get carregandoListaPessoas$(): Observable<boolean> {
    return this._carregandoListaPessoas$.asObservable();
  }

  set carregandoListaPessoas(carregando: boolean) {
    this._carregandoListaPessoas$.next(carregando);
  }

  get carregandoListaPessoas(): boolean {
    return this._carregandoListaPessoas$.value;
  }

  //
  // listaPessoas
  //
  get listaPessoas$(): Observable<ResponsePessoas> {
    return this._listaPessoas$.asObservable();
  }

  set listaPessoas(lista: ResponsePessoas) {
    sessionStorage.setItem('lista', JSON.stringify(lista));
    this._listaPessoas$.next(lista);
  }

  get listaPessoas(): ResponsePessoas {
    if (Object.keys(this._listaPessoas$.value).length === 0) {
      this.listaPessoas = JSON.parse(sessionStorage.getItem('lista')!);
    }
    return this._listaPessoas$.value;
  }
}
