import { HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CardPessoaComponent } from '../card-pessoa/card-pessoa.component';
import { Estatisticas } from '../models/estatisticas.model';
import { Pessoa, ResponsePessoas } from '../models/pessoas.models';
import { AbitusService } from '../services/abitus.service';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [CardPessoaComponent, SharedModule],
})
export class DashboardComponent {
  private readonly _abitusService = inject(AbitusService);

  listaPessoas: Pessoa[] = [];

  nrLocalizados = 0;
  nrDesaparecidos = 0;

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 40];
  showPageSizeOptions = true;

  parametros = new HttpParams()
    .set('pagina', this.pageIndex)
    .set('porPagina', this.pageSize);

  ngOnInit(): void {
    this.carregaPessoas(this.parametros);
    this.carregaEstatisticas();
  }

  paginacao(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.parametros = new HttpParams()
      .set('pagina', this.pageIndex)
      .set('porPagina', this.pageSize);

    this.carregaPessoas(this.parametros);
  }

  carregaPessoas(parametros: HttpParams) {
    this._abitusService.listaPessoas(parametros).subscribe({
      next: (res: ResponsePessoas) => {
        this.listaPessoas = res.content;
        this.length = res.totalElements;
      },
    });
  }

  carregaEstatisticas() {
    this._abitusService.buscaEstatisticas().subscribe({
      next: (res: Estatisticas) => {
        this.nrDesaparecidos = res.quantPessoasDesaparecidas;
        this.nrLocalizados = res.quantPessoasEncontradas;
      },
    });
  }

  mostraData() {
    return new Date(Date.now()).toLocaleDateString('pt-BR', {
      timeZone: 'America/Cuiaba',
    });
  }
}
