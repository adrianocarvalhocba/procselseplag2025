import { NgModule } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterOutlet } from '@angular/router';
import { getPtBRPaginatorIntl } from './getPtBRPaginatorIntl';

@NgModule({
  imports: [MatPaginatorModule, MatProgressBarModule, RouterOutlet],
  exports: [MatPaginatorModule, MatProgressBarModule, RouterOutlet],
  providers: [{ provide: MatPaginatorIntl, useValue: getPtBRPaginatorIntl() }],
  declarations: [],
})
export class SharedModule {}
