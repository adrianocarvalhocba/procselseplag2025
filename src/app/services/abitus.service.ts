import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePessoas } from '../models/pessoas.models';

@Injectable({ providedIn: 'root' })
export class AbitusService {
  private readonly _http = inject(HttpClient);

  listaPessoas(parametros: HttpParams): Observable<ResponsePessoas> {
    return this._http.get<ResponsePessoas>(
      'https://abitus-api.geia.vip/v1/pessoas/aberto/filtro',
      {
        params: parametros,
      }
    );
  }
}
