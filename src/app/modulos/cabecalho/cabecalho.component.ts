import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Estatisticas } from '../../shared/models/estatisticas.model';
import { SharedModule } from '../../shared/shared.module';
import { CabecalhoFacade } from './cabecalho.facade';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss',
  standalone: true,
  imports: [SharedModule],
})
export class CabecalhoComponent {
  private readonly _cabecalhoFacade = inject(CabecalhoFacade);

  nrLocalizados = 0;
  nrDesaparecidos = 0;
  dataAtual = '';

  removeInscricao$ = new Subject<void>();

  ngOnInit(): void {
    this.dataAtual = this.mostraData();

    this.carregaEstatisticas();
  }

  carregaEstatisticas() {
    this._cabecalhoFacade.estatisticas$
      .pipe(takeUntil(this.removeInscricao$))
      .subscribe({
        next: (res: Estatisticas) => {
          this.nrDesaparecidos = res.quantPessoasDesaparecidas;
          this.nrLocalizados = res.quantPessoasEncontradas;
        },
      });

    this._cabecalhoFacade.carregaEstatisticas();
  }

  mostraData() {
    return new Date(Date.now()).toLocaleDateString('pt-BR', {
      timeZone: 'America/Cuiaba',
    });
  }

  ngOnDestroy(): void {
    this.removeInscricao$.next();
    this.removeInscricao$.complete();
  }
}
