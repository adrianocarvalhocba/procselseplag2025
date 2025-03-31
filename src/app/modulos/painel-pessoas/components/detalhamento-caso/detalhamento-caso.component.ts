import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Pessoa } from '../../../../shared/models/pessoas.model';
import { SharedModule } from '../../../../shared/shared.module';
import { PainelPessoasFacade } from '../../painel-pessoas.facade';
import { DialogEnviaInformacoesComponent } from './components/dialog-envia-informacoes/dialog-envia-informacoes.component';

@Component({
  selector: 'app-detalhamento-caso',
  templateUrl: './detalhamento-caso.component.html',
  styleUrl: './detalhamento-caso.component.scss',
  standalone: true,
  imports: [SharedModule],
})
export class DetalhamentoCasoComponent {
  private readonly dialog = inject(MatDialog);
  private readonly _route = inject(ActivatedRoute);
  private readonly _painelPessoasFacade = inject(PainelPessoasFacade);

  dadosPessoa!: Pessoa;
  urlFoto!: string;
  tituloFoto!: string;
  qtdeDiasDesap!: number;
  dtDesaparecimento!: string;
  dtLocalizacao!: string;

  ngOnInit(): void {
    this.dadosPessoa = this._painelPessoasFacade.getPessoa(
      Number(this._route.snapshot.url[1].path)
    );

    if (!this.dadosPessoa.urlFoto || this.dadosPessoa.urlFoto == null) {
      if (this.dadosPessoa.sexo === 'MASCULINO') {
        this.dadosPessoa.urlFoto = 'assets/sem-foto-masculino.png';
      } else {
        this.dadosPessoa.urlFoto = 'assets/sem-foto-feminino.png';
      }
    }

    this.dtDesaparecimento =
      this.dadosPessoa.ultimaOcorrencia.dtDesaparecimento;
    this.dtLocalizacao = this.dadosPessoa.ultimaOcorrencia.dataLocalizacao;

    const data1: any = new Date(Date.now());
    const data2: any = new Date(
      this.dadosPessoa.ultimaOcorrencia.dtDesaparecimento
    );

    const diffInMs = Math.abs(data2 - data1);
    this.qtdeDiasDesap = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    let aux = this.dadosPessoa.ultimaOcorrencia.dtDesaparecimento.split('T');
    this.dtDesaparecimento = aux[0].split('-').reverse().join('/');
    this.dtDesaparecimento += ' - ' + aux[1];

    if (this.dtLocalizacao) {
      this.dtLocalizacao = this.dadosPessoa.ultimaOcorrencia.dataLocalizacao
        .split('-')
        .reverse()
        .join('/');
    }

    if (!this.dadosPessoa.ultimaOcorrencia.dataLocalizacao) {
      if (this.dadosPessoa.sexo === 'MASCULINO') {
        this.tituloFoto = 'Desaparecido';
      } else {
        this.tituloFoto = 'Desaparecida';
      }
    } else {
      if (this.dadosPessoa.sexo === 'MASCULINO') {
        this.tituloFoto = 'Localizado';
      } else {
        this.tituloFoto = 'Localizada';
      }
    }
  }

  enviaInformacoes() {
    this.dialog.open(DialogEnviaInformacoesComponent, {
      data: { ocoId: this.dadosPessoa.ultimaOcorrencia.ocoId },
      disableClose: true,
    });
  }
}
