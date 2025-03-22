import { NgModule } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { getPtBRPaginatorIntl } from './getPtBRPaginatorIntl';

@NgModule({
  imports: [MatPaginatorModule, MatProgressBarModule],
  exports: [MatPaginatorModule, MatProgressBarModule],
  providers: [{ provide: MatPaginatorIntl, useValue: getPtBRPaginatorIntl() }],
  declarations: [],
})
export class SharedModule {}
