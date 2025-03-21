import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
  {
    path: 'Dashboard',
    component: DashboardComponent,
  },
];
