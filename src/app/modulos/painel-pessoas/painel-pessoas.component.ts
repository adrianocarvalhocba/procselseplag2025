import { HttpParams } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import { Pessoa, ResponsePessoas } from '../../shared/models/pessoas.model';
import { SharedModule } from '../../shared/shared.module';
import { CardPessoaComponent } from './components/card-pessoa/card-pessoa.component';
import { DialogFiltroComponent } from './components/dialog-filtro/dialog-filtro.component';
import { PainelPessoasFacade } from './painel-pessoas.facade';

@Component({
  selector: 'app-painel-pessoas',
  templateUrl: './painel-pessoas.component.html',
  styleUrl: './painel-pessoas.component.scss',
  standalone: true,
  imports: [SharedModule, CardPessoaComponent],
})
export class PainelPessoasComponent {
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  private readonly dialog = inject(MatDialog);
  private readonly _painelPessoasFacade = inject(PainelPessoasFacade);

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 40, 100];
  showPageSizeOptions = true;

  carregando!: boolean;
  listaPessoas: Pessoa[] = [];
  filtrando: boolean = false;

  removeInscricao$ = new Subject<void>();

  parametros!: HttpParams;

  ngOnInit(): void {
    this.parametros = new HttpParams();

    let paginaSession = sessionStorage.getItem('pagina') || 0;
    if (paginaSession) {
      this.pageIndex = Number(paginaSession);
      this.parametros = this.parametros.append('pagina', paginaSession);
    }

    let porPaginaSession = sessionStorage.getItem('porPagina') || 10;
    if (porPaginaSession) {
      this.pageSize = Number(porPaginaSession);
      this.parametros = this.parametros.append('porPagina', porPaginaSession);
    }

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

    let filtroString = sessionStorage.getItem('filtro');
    let filtro: any = filtroString ? JSON.parse(filtroString) : {};

    if (Object.keys(filtro).length > 0) {
      this.filtrando = true;
    }

    if (filtro.nome) {
      this.parametros = this.parametros.append('nome', filtro.nome);
    }

    if (filtro?.sexo?.value) {
      this.parametros = this.parametros.append('sexo', filtro.sexo.value);
    }

    if (filtro.faixaIdadeInicial) {
      this.parametros = this.parametros.append(
        'faixaIdadeInicial',
        filtro.faixaIdadeInicial
      );
    }

    if (filtro.faixaIdadeFinal) {
      this.parametros = this.parametros.append(
        'faixaIdadeFinal',
        filtro.faixaIdadeFinal
      );
    }

    if (filtro?.status?.value) {
      this.parametros = this.parametros.append('status', filtro.status.value);
    }

    this._painelPessoasFacade.carregaListaPessoas(this.parametros);
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

    let filtroString = sessionStorage.getItem('filtro');
    let filtro: any = filtroString ? JSON.parse(filtroString) : {};

    if (filtro.nome) {
      this.parametros = this.parametros.append('nome', filtro.nome);
    }

    if (filtro?.sexo?.value) {
      this.parametros = this.parametros.append('sexo', filtro.sexo.value);
    }

    if (filtro.faixaIdadeInicial) {
      this.parametros = this.parametros.append(
        'faixaIdadeInicial',
        filtro.faixaIdadeInicial
      );
    }

    if (filtro.faixaIdadeFinal) {
      this.parametros = this.parametros.append(
        'faixaIdadeFinal',
        filtro.faixaIdadeFinal
      );
    }

    if (filtro?.status?.value) {
      this.parametros = this.parametros.append('status', filtro.status.value);
    }

    this._painelPessoasFacade.carregaListaPessoas(this.parametros);
  }

  mostraFiltro() {
    const dialogRef = this.dialog.open(DialogFiltroComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe({
      next: (retorno) => {
        if (!this.filtrando && retorno) this.filtrando = retorno;
      },
    });
  }

  limpaFiltro() {
    this.filtrando = false;
    sessionStorage.clear();
    this.matPaginator.firstPage();

    this.parametros = new HttpParams()
      .set('pagina', this.pageIndex)
      .set('porPagina', this.pageSize);

    sessionStorage.setItem('pagina', this.pageIndex.toString());
    sessionStorage.setItem('porPagina', this.pageSize.toString());

    this._painelPessoasFacade.carregaListaPessoas(this.parametros);
  }

  ngOnDestroy(): void {
    this.removeInscricao$.next();
    this.removeInscricao$.complete();
  }
}
