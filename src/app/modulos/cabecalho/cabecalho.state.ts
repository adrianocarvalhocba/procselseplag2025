import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Estatisticas } from '../../shared/models/estatisticas.model';

@Injectable({ providedIn: 'root' })
export class CabecalhoState {
  private readonly _estatisticas$ = new BehaviorSubject<Estatisticas>(
    {} as Estatisticas
  );

  //
  // estatisticas
  //
  get estatisticas$(): Observable<Estatisticas> {
    return this._estatisticas$.asObservable();
  }

  set estatisticas(valores: Estatisticas) {
    this._estatisticas$.next(valores);
  }

  get estatisticas(): Estatisticas {
    return this._estatisticas$.value;
  }
}
