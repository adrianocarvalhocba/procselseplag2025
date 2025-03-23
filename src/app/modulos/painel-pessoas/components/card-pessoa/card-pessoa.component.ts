import { Component, Input } from '@angular/core';
import { Pessoa } from '../../../../models/pessoas.models';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-card-pessoa',
  templateUrl: './card-pessoa.component.html',
  styleUrl: './card-pessoa.component.scss',
  standalone: true,
  imports: [SharedModule],
})
export class CardPessoaComponent {
  @Input() dadosPessoa: Pessoa = {} as Pessoa;

  dtLocalizacao: string = '';
  dtDesaparecimento: string = '';

  ngOnInit(): void {
    console.log('-> ', this.dadosPessoa);

    if (this.dadosPessoa.ultimaOcorrencia.dataLocalizacao) {
      this.dtLocalizacao = this.dadosPessoa.ultimaOcorrencia.dataLocalizacao
        .split('-')
        .reverse()
        .join('/');
    }

    this.dtDesaparecimento = this.dadosPessoa.ultimaOcorrencia.dtDesaparecimento
      .split('T')[0]
      .split('-')
      .reverse()
      .join('/');
  }

  ngAfterContentChecked(): void {
    if (!this.dadosPessoa.urlFoto || this.dadosPessoa.urlFoto == null) {
      if (this.dadosPessoa.sexo === 'MASCULINO') {
        this.dadosPessoa.urlFoto = 'assets/sem-foto-masculino.png';
      } else {
        this.dadosPessoa.urlFoto = 'assets/sem-foto-feminino.png';
      }
    }
  }
}
