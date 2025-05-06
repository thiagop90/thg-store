import { ptBR, enUS, type Locale } from 'date-fns/locale'

export const LOCALE_MAP: Record<string, Locale> = {
  pt: ptBR,
  en: enUS,
}

export function getDateFnsLocale(locale: string) {
  return LOCALE_MAP[locale]
}
