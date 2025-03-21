import { MatPaginatorIntl } from '@angular/material/paginator';

const ptBRRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 de ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

export function getPtBRPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.getRangeLabel = ptBRRangeLabel;
  paginatorIntl.itemsPerPageLabel = 'Items por página:';
  paginatorIntl.nextPageLabel = 'Avançar página';
  paginatorIntl.previousPageLabel = 'Voltar página';
  paginatorIntl.firstPageLabel = 'Voltar para primeira página';
  paginatorIntl.lastPageLabel = 'Ir para a última página';

  return paginatorIntl;
}
