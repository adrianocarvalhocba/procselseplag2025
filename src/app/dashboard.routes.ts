import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'PainelPessoas', pathMatch: 'full' },
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
