export interface InformacoesSalvas {
  id: number;
  ocoId: number;
  informacao: string;
  data: string;
  anexos: Anexo[];
}

export interface Anexo {
  item: string;
}
