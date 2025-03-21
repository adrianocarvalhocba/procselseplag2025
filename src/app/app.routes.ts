import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'DashboardComponent', pathMatch: 'full' },
  {
    path: 'DashboardComponent',
    component: DashboardComponent,
  },
];
