export interface ResponsePessoas {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  empty: boolean;
  pageable: Paginavel;
  sort: Classificavel;
  content: Pessoa[];
}

export interface Paginavel {
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
  offset: number;
  sort: Classificavel;
}

export interface Classificavel {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: Ocorrencia;
}

export interface Ocorrencia {
  dtDesaparecimento: string;
  dataLocalizacao: string;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: Entrevista;
  listaCartaz: Cartaz[];
  ocoId: number;
}

export interface Cartaz {
  urlCartaz: string;
  tipoCartaz: string;
}

export interface Entrevista {
  informacao: string;
  vestimentasDesaparecido: string;
}
