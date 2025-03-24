import { CommonModule, JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { getPtBRPaginatorIntl } from './getPtBRPaginatorIntl';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    RouterOutlet,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
    JsonPipe,
  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    RouterOutlet,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
    JsonPipe,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPtBRPaginatorIntl() },
    provideNgxMask(),
  ],
  declarations: [],
})
export class SharedModule {}
