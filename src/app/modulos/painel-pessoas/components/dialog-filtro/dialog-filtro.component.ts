import { HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ISexo, ISituacao } from '../../../../shared/models/filtro.model';
import { SharedModule } from '../../../../shared/shared.module';
import { PainelPessoasFacade } from '../../painel-pessoas.facade';

@Component({
  selector: 'app-dialog-filtro',
  templateUrl: './dialog-filtro.component.html',
  styleUrl: './dialog-filtro.component.scss',
  standalone: true,
  imports: [SharedModule],
})
export class DialogFiltroComponent {
  private readonly _painelPessoasFacade = inject(PainelPessoasFacade);
  private readonly dialogRef = inject(MatDialogRef<DialogFiltroComponent>);
  private _formBuilder = inject(FormBuilder);

  formFiltro!: UntypedFormGroup;

  listaSexo: ISexo[] = [
    { value: 'MASCULINO', descricao: 'Masculino' },
    { value: 'FEMININO', descricao: 'Feminino' },
  ];

  listaSituacoes: ISituacao[] = [
    { value: 'DESAPARECIDO', descricao: 'Desaparecido' },
    { value: 'LOCALIZADO', descricao: 'Localizado' },
  ];

  ngOnInit(): void {
    this.criaFormulario();
  }

  criaFormulario() {
    this.formFiltro = this._formBuilder.group({
      nome: [null],
      sexo: [null],
      faixaIdadeInicial: [null],
      faixaIdadeFinal: [null],
      status: [null],
    });
  }

  aplicaFiltro() {
    let parametros = new HttpParams();

    let nome = this.formFiltro.get('nome')!.value;
    if (nome) {
      parametros = parametros.append('nome', nome);
    }

    let sexo = this.formFiltro.get('sexo')!.value;
    if (sexo) {
      parametros = parametros.append('sexo', sexo.value);
    }

    let faixaIdadeInicial = this.formFiltro.get('faixaIdadeInicial')!.value;
    if (faixaIdadeInicial) {
      parametros = parametros.append('faixaIdadeInicial', faixaIdadeInicial);
    }

    let faixaIdadeFinal = this.formFiltro.get('faixaIdadeFinal')!.value;
    if (faixaIdadeFinal) {
      parametros = parametros.append('faixaIdadeFinal', faixaIdadeFinal);
    }

    let status = this.formFiltro.get('status')!.value;
    if (status) {
      parametros = parametros.append('status', status.value);
    }

    this._painelPessoasFacade.carregaListaPessoas(parametros);

    this.dialogRef.close(true);
  }
}
