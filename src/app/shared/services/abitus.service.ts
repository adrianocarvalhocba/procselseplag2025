import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Estatisticas } from '../models/estatisticas.model';
import { Foto } from '../models/foto.model';
import { InformacoesSalvas } from '../models/informacoes-salvas.model';
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
    formDados: any,
    anexos: Foto[]
  ): Observable<InformacoesSalvas> {
    const formData: FormData = new FormData();

    anexos.forEach((arquivo) => {
      formData.append('files', arquivo.file, arquivo.file.name);
    });

    let data = formDados.data.split('/').reverse().join('-');

    let params = new HttpParams()
      .set('informacao', formDados.informacoes)
      .set('descricao', formDados.descricao)
      .set('data', data)
      .set('ocoId', formDados.ocoId);

    return this._http.post<InformacoesSalvas>(
      `${env.urlAPI}/ocorrencias/informacoes-desaparecido`,
      formData,
      {
        params,
        reportProgress: true,
        responseType: 'json',
      }
    );
  }
}
