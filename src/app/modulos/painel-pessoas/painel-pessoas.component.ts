import { HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import { Pessoa, ResponsePessoas } from '../../shared/models/pessoas.model';
import { SharedModule } from '../../shared/shared.module';
import { CardPessoaComponent } from './components/card-pessoa/card-pessoa.component';
import { PainelPessoasFacade } from './painel-pessoas.facade';

@Component({
  selector: 'app-painel-pessoas',
  templateUrl: './painel-pessoas.component.html',
  styleUrl: './painel-pessoas.component.scss',
  standalone: true,
  imports: [SharedModule, CardPessoaComponent],
})
export class PainelPessoasComponent {
  private readonly _painelPessoasFacade = inject(PainelPessoasFacade);

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 40, 100];
  showPageSizeOptions = true;

  carregando!: boolean;
  listaPessoas: Pessoa[] = [];

  removeInscricao$ = new Subject<void>();

  parametros!: HttpParams;

  ngOnInit(): void {
    this.parametros = new HttpParams();

    // se estiver paginado pega as configurações da pagina atual, senão valor inicial
    let paginaSession = sessionStorage.getItem('pagina') || 0;
    if (paginaSession) {
      this.pageIndex = Number(paginaSession);
      this.parametros = this.parametros.append('pagina', paginaSession);
    }

    // se estiver paginado pega as configurações da qtde por pagina, senão valor inicial
    let porPaginaSession = sessionStorage.getItem('porPagina') || 10;
    if (porPaginaSession) {
      this.pageSize = Number(porPaginaSession);
      this.parametros = this.parametros.append('porPagina', porPaginaSession);
    }

    this.carregaPessoas(this.parametros);
  }

  paginacao(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.parametros = new HttpParams()
      .set('pagina', this.pageIndex)
      .set('porPagina', this.pageSize);

    sessionStorage.setItem('pagina', this.pageIndex.toString());
    sessionStorage.setItem('porPagina', this.pageSize.toString());

    this.carregaPessoas(this.parametros);
  }

  carregaPessoas(parametros: HttpParams) {
    this._painelPessoasFacade.carregandoListaPessoas$
      .pipe(takeUntil(this.removeInscricao$))
      .subscribe({
        next: (carregando: boolean) => {
          this.carregando = carregando;
        },
      });

    this._painelPessoasFacade.listaPessoas$
      .pipe(takeUntil(this.removeInscricao$))
      .subscribe({
        next: (listaPessoas: ResponsePessoas) => {
          this.listaPessoas = listaPessoas.content;
          this.length = listaPessoas.totalElements;
        },
      });

    this._painelPessoasFacade.carregaListaPessoas(parametros);
  }

  ngOnDestroy(): void {
    this.removeInscricao$.next();
    this.removeInscricao$.complete();
  }
}
