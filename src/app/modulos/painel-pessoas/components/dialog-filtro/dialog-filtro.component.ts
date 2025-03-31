import { HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ETipoMensagem } from '../../../../shared/enums';
import { ISexo, ISituacao } from '../../../../shared/models/filtro.model';
import { UtilService } from '../../../../shared/services/util.service';
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
  public readonly data = inject(MAT_DIALOG_DATA);
  private _formBuilder = inject(FormBuilder);
  private readonly _utilService = inject(UtilService);

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

    let filtroString = sessionStorage.getItem('filtro');
    let filtro: any = filtroString ? JSON.parse(filtroString) : {};

    this.formFiltro.patchValue(filtro);

    if (filtro?.sexo?.value) {
      this.formFiltro
        .get('sexo')
        ?.setValue(
          this.listaSexo.find((item) => item.value === filtro.sexo.value)
        );
    }

    if (filtro?.status?.value) {
      this.formFiltro
        .get('status')
        ?.setValue(
          this.listaSituacoes.find((item) => item.value === filtro.status.value)
        );
    }
  }

  aplicaFiltro() {
    let filtro = {
      nome: this.formFiltro.get('nome')!.value,
      sexo: this.formFiltro.get('sexo')!.value,
      faixaIdadeInicial: this.formFiltro.get('faixaIdadeInicial')!.value,
      faixaIdadeFinal: this.formFiltro.get('faixaIdadeFinal')!.value,
      status: this.formFiltro.get('status')!.value,
    };

    if (
      filtro.nome === null &&
      filtro.sexo === null &&
      filtro.faixaIdadeInicial === null &&
      filtro.faixaIdadeFinal === null &&
      filtro.status === null
    ) {
      this._utilService.mensagem(
        ETipoMensagem.ERROR,
        `Para filtrar algum valor precisa ser informado!`
      );
      return;
    }

    sessionStorage.clear();

    sessionStorage.setItem('filtro', JSON.stringify(filtro));

    let parametros = new HttpParams();

    if (filtro.nome) {
      parametros = parametros.append('nome', filtro.nome);
    }

    if (filtro.sexo) {
      parametros = parametros.append('sexo', filtro.sexo.value);
    }

    if (filtro.faixaIdadeInicial) {
      parametros = parametros.append(
        'faixaIdadeInicial',
        filtro.faixaIdadeInicial
      );
    }

    if (filtro.faixaIdadeFinal) {
      parametros = parametros.append('faixaIdadeFinal', filtro.faixaIdadeFinal);
    }

    if (filtro.status) {
      parametros = parametros.append('status', filtro.status.value);
    }

    this._painelPessoasFacade.carregaListaPessoas(parametros);

    this.dialogRef.close(true);
  }
}
