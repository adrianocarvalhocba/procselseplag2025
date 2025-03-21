import { NgModule } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { getPtBRPaginatorIntl } from './dashboard/getPtBRPaginatorIntl';

@NgModule({
  imports: [MatPaginatorModule],
  exports: [MatPaginatorModule],
  providers: [{ provide: MatPaginatorIntl, useValue: getPtBRPaginatorIntl() }],
  declarations: [],
})
export class SharedModule {}
