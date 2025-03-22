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
