import { Component, inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnexaFotoComponent } from '../../../../../../shared/components/anexa-foto/anexa-foto.component';
import { MostraFotosComponent } from '../../../../../../shared/components/mostra-fotos/mostra-fotos.component';
import { Foto } from '../../../../../../shared/models/foto.model';
import { SharedModule } from '../../../../../../shared/shared.module';
import { PainelPessoasFacade } from '../../../../painel-pessoas.facade';

@Component({
  selector: 'app-dialog-envia-informacoes',
  templateUrl: './dialog-envia-informacoes.component.html',
  styleUrl: './dialog-envia-informacoes.component.scss',
  standalone: true,
  imports: [SharedModule, MostraFotosComponent, AnexaFotoComponent],
})
export class DialogEnviaInformacoesComponent {
  private readonly _painelPessoasFacade = inject(PainelPessoasFacade);
  private readonly dialogRef = inject(
    MatDialogRef<DialogEnviaInformacoesComponent>
  );
  public readonly data: any = inject(MAT_DIALOG_DATA);
  private _formBuilder = inject(FormBuilder);

  formDados!: UntypedFormGroup;
  file: any;
  urlImagem: any;
  fotos: Foto[] = [];

  ngOnInit(): void {
    this.criaFormulario();
  }

  criaFormulario() {
    this.formDados = this._formBuilder.group({
      informacoes: [null],
      data: [null],
      descricao: [null],
      ocoId: [null],
    });

    this.formDados.patchValue(this.data);
  }

  anexaFoto(file: File) {
    const fotoExistente = this.fotos.find(
      (foto) => foto.file.name === file.name
    );

    if (!fotoExistente) {
      const novaFoto: Foto = {
        file,
        url: URL.createObjectURL(file),
      };

      this.fotos.push(novaFoto);
    }
  }

  removeFoto(index: number) {
    URL.revokeObjectURL(this.fotos[index].url);
    this.fotos.splice(index, 1);
  }

  salvaInformacoes() {
    this._painelPessoasFacade
      .salvaInformacoes(this.formDados.getRawValue(), this.fotos)
      .subscribe({
        next: () => this.dialogRef.close(),
      });
  }
}
