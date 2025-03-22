import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { Estatisticas } from '../models/estatisticas.model';
import { ResponsePessoas } from '../models/pessoas.models';

@Injectable({ providedIn: 'root' })
export class AbitusService {
  private readonly _http = inject(HttpClient);

  listaPessoas(parametros: HttpParams): Observable<ResponsePessoas> {
    return this._http.get<ResponsePessoas>(
      `${env.urlAPI}/pessoas/aberto/filtro`,
      {
        params: parametros,
      }
    );
  }

  buscaEstatisticas(): Observable<Estatisticas> {
    return this._http.get<Estatisticas>(
      `${env.urlAPI}/pessoas/aberto/estatistico`
    );
  }
}
