import { HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CardPessoaComponent } from '../card-pessoa/card-pessoa.component';
import { Pessoa, ResponsePessoas } from '../models/pessoas.models';
import { AbitusService } from '../services/abitus.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [CardPessoaComponent, MatPaginatorModule],
})
export class DashboardComponent {
  private readonly _abitusService = inject(AbitusService);

  listaPessoas: Pessoa[] = [];

  length = 0;
  pageIndex = 0;
  pageSize = 10;
  currentPage = 0;

  parametros = new HttpParams()
    .set('pagina', this.pageIndex)
    .set('porPagina', this.pageSize);

  ngOnInit(): void {
    this.carregaPessoas(this.parametros);
  }

  paginacao(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    this.parametros = new HttpParams()
      .set('pagina', this.currentPage)
      .set('porPagina', this.pageSize);

    this.carregaPessoas(this.parametros);
  }

  carregaPessoas(parametros: HttpParams) {
    this._abitusService.listaPessoas(parametros).subscribe({
      next: (res: ResponsePessoas) => {
        this.listaPessoas = res.content;
        this.length = res.totalElements;

        console.log('=> ', res.content);
      },
    });
  }
}
