import { Component, inject } from '@angular/core';
import { Estatisticas } from '../../models/estatisticas.model';
import { AbitusService } from '../../services/abitus.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.scss',
  standalone: true,
  imports: [SharedModule],
})
export class CabecalhoComponent {
  private readonly _abitusService = inject(AbitusService);

  nrLocalizados = 0;
  nrDesaparecidos = 0;
  dataAtual = '';

  ngOnInit(): void {
    this.dataAtual = this.mostraData();

    this.carregaEstatisticas();
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
