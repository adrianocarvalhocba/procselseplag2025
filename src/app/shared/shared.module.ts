import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    RouterOutlet,
    RouterModule,
  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    RouterOutlet,
    RouterModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getPtBRPaginatorIntl() }],
  declarations: [],
})
export class SharedModule {}
