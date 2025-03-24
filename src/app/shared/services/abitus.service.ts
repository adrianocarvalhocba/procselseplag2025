import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Estatisticas } from '../models/estatisticas.model';
import { Pessoa, ResponsePessoas } from '../models/pessoas.model';

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

  salvaInformacoes(
    ocoId: string,
    informacoes: string,
    data: string,
    descricao: string,
    file: File
  ): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('ocoId', ocoId);
    formData.append('informacao', informacoes);
    formData.append('data', data);
    formData.append('descricao', descricao);
    formData.append('file', file);

    return this._http.post<any>(
      `${env.urlAPI}/ocorrencias/informacoes-desaparecido`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }
}
