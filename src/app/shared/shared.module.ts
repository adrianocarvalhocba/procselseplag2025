import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { getPtBRPaginatorIntl } from './getPtBRPaginatorIntl';

@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    RouterOutlet,
    RouterModule,
  ],
  exports: [
    CommonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    RouterOutlet,
    RouterModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getPtBRPaginatorIntl() }],
  declarations: [],
})
export class SharedModule {}
