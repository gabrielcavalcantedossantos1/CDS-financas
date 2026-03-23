export function formatDate(value: number) {
  return new Intl.DateTimeFormat("pt-BR").format(value);
}
