import { startOfDay } from "date-fns";

const DEFAULT_START_DATE = new Date(2020, 0, 1);
const DEFAULT_END_DATE = new Date();

function isDefaultDateRange(start: Date, end: Date): boolean {
  return (
    startOfDay(start).getTime() === startOfDay(DEFAULT_START_DATE).getTime() &&
    startOfDay(end).getTime() === startOfDay(DEFAULT_END_DATE).getTime()
  );
}

export { DEFAULT_END_DATE, DEFAULT_START_DATE, isDefaultDateRange };
