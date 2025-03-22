import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { PainelPessoasComponent } from '../painel-pessoas/painel-pessoas.component';
import { RodapeComponent } from '../rodape/rodape.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    SharedModule,
    CabecalhoComponent,
    RodapeComponent,
    PainelPessoasComponent,
  ],
})
export class DashboardComponent {}
