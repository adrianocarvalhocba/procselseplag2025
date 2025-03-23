import { Routes } from '@angular/router';
import { PainelPessoasComponent } from './modulos/painel-pessoas/painel-pessoas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'PainelPessoas', pathMatch: 'full' },
  {
    path: 'PainelPessoas',
    component: PainelPessoasComponent,
  },
  {
    path: 'PainelPessoas',
    loadComponent: () =>
      import('./modulos/painel-pessoas/painel-pessoas.component').then(
        (m) => m.PainelPessoasComponent
      ),
  },
  {
    path: 'DetalhamentoCaso/:id',
    loadComponent: () =>
      import(
        './modulos/painel-pessoas/components/detalhamento-caso/detalhamento-caso.component'
      ).then((m) => m.DetalhamentoCasoComponent),
  },
];
