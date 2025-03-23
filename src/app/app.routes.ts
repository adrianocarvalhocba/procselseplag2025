import { Routes } from '@angular/router';
import { PainelPessoasComponent } from './modulos/painel-pessoas/painel-pessoas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'PainelPessoas', pathMatch: 'full' },
  {
    path: 'PainelPessoas',
    component: PainelPessoasComponent,
  },
];
