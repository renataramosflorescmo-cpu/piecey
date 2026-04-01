import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "dd/MM/yyyy", { locale: ptBR });
}
