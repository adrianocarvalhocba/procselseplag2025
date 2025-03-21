import { Component, Input } from '@angular/core';
import { Pessoa } from '../models/pessoas.models';

@Component({
  selector: 'app-card-pessoa',
  templateUrl: './card-pessoa.component.html',
  styleUrl: './card-pessoa.component.scss',
  standalone: true,
  imports: [],
})
export class CardPessoaComponent {
  @Input() dadosPessoa: Pessoa = {} as Pessoa;
}
