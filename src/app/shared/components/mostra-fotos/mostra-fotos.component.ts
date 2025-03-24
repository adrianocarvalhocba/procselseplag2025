import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Foto } from '../../models/foto.model';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'mostra-fotos',
  templateUrl: './mostra-fotos.component.html',
  styleUrl: './mostra-fotos.component.scss',
  standalone: true,
  imports: [SharedModule],
})
export class MostraFotosComponent {
  @Input() fotosAnexadas: Foto[] = [];

  @Output() removeFoto = new EventEmitter<number>();

  remover(index: number) {
    this.removeFoto.emit(index);
  }
}
