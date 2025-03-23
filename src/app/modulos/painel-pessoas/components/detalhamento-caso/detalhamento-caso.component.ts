import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-detalhamento-caso',
  templateUrl: './detalhamento-caso.component.html',
  styleUrl: './detalhamento-caso.component.scss',
  standalone: true,
  imports: [SharedModule],
})
export class DetalhamentoCasoComponent {
  private readonly _route = inject(ActivatedRoute);

  teste = '';

  ngOnInit(): void {
    this.teste = this._route.snapshot.url[1].path;
  }
}
