/**
 * Retorna o último dia útil (não sábado/domingo) do mês da data de referência.
 * Não considera feriados nacionais, só fins de semana.
 */
export function getLastBusinessDayOfMonth(referenceDate: Date = new Date()): Date {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();

  // Dia 0 do mês seguinte = último dia do mês atual
  const lastDay = new Date(year, month + 1, 0);

  const dayOfWeek = lastDay.getDay(); // 0 = domingo, 6 = sábado

  if (dayOfWeek === 0) {
    lastDay.setDate(lastDay.getDate() - 2); // domingo -> sexta
  } else if (dayOfWeek === 6) {
    lastDay.setDate(lastDay.getDate() - 1); // sábado -> sexta
  }

  return lastDay;
}

/**
 * Formata uma data como "31 de outubro" (sem ano), em português.
 */
export function formatDateExtenso(date: Date): string {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
  }).format(date);

  return formatted;
}
