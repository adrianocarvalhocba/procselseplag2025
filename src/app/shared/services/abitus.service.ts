import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Estatisticas } from '../models/estatisticas.model';
import { Pessoa, ResponsePessoas } from '../models/pessoas.models';

@Injectable({ providedIn: 'root' })
export class AbitusService {
  private readonly _http = inject(HttpClient);

  buscaEstatisticas(): Observable<Estatisticas> {
    return this._http.get<Estatisticas>(
      `${env.urlAPI}/pessoas/aberto/estatistico`
    );
  }

  listaPessoas(parametros: HttpParams): Observable<ResponsePessoas> {
    return this._http.get<ResponsePessoas>(
      `${env.urlAPI}/pessoas/aberto/filtro`,
      {
        params: parametros,
      }
    );
  }

  buscaPessoa(idPessoa: number): Observable<Pessoa> {
    return this._http.get<Pessoa>(`${env.urlAPI}/pessoas/${idPessoa}`);
  }
}
