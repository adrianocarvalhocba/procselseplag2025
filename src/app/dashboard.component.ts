import { Component } from '@angular/core';
import { CabecalhoComponent } from './modulos/cabecalho/cabecalho.component';
import { RodapeComponent } from './modulos/rodape/rodape.component';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [SharedModule, CabecalhoComponent, RodapeComponent],
})
export class DashboardComponent {}
