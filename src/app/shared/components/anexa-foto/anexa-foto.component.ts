import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'anexa-foto',
  templateUrl: './anexa-foto.component.html',
  styleUrl: './anexa-foto.component.scss',
  standalone: true,
  imports: [SharedModule],
})
export class AnexaFotoComponent {
  @Input() arquivosAceitos = 'image/*';
  @Output() fotoNova = new EventEmitter<File>();

  selecionandoArquivo(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fotoNova.emit(file);
    }
  }
}
