import { startOfDay } from "date-fns";

const DEFAULT_START_DATE = new Date(2020, 0, 1);
const DEFAULT_END_DATE = new Date();

const dateFormats: Record<string, string> = {
  AUD: "dd/MM/yyyy",
  BGN: "dd.MM.yyyy",
  BRL: "dd/MM/yyyy",
  CAD: "MM/dd/yyyy",
  CHF: "dd.MM.yyyy",
  CNY: "yyyy/MM/dd",
  CZK: "dd.MM.yyyy",
  DKK: "dd-MM-yyyy",
  EUR: "dd/MM/yyyy",
  GBP: "dd/MM/yyyy",
  HKD: "dd/MM/yyyy",
  HUF: "yyyy.MM.dd.",
  IDR: "dd/MM/yyyy",
  ILS: "dd/MM/yyyy",
  INR: "dd/MM/yyyy",
  ISK: "dd.MM.yyyy",
  JPY: "yyyy/MM/dd",
  KRW: "yyyy-MM-dd",
  MXN: "dd/MM/yyyy",
  MYR: "dd/MM/yyyy",
  NOK: "dd.MM.yyyy",
  NZD: "dd/MM/yyyy",
  PHP: "MM/dd/yyyy",
  PLN: "dd.MM.yyyy",
  RON: "dd.MM.yyyy",
  SEK: "yyyy-MM-dd",
  SGD: "dd/MM/yyyy",
  THB: "dd/MM/yyyy",
  TRY: "dd.MM.yyyy",
  USD: "MM/dd/yyyy",
  ZAR: "dd/MM/yyyy",
};

function isDefaultDateRange(start: Date, end: Date): boolean {
  return (
    startOfDay(start).getTime() === startOfDay(DEFAULT_START_DATE).getTime() &&
    startOfDay(end).getTime() === startOfDay(DEFAULT_END_DATE).getTime()
  );
}

export {
  dateFormats,
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  isDefaultDateRange,
};
