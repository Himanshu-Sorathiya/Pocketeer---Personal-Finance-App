import type { Row } from "@tanstack/react-table";
import { startOfDay } from "date-fns";

import type { Transaction } from "../types/transaction.types.ts";

function filterCategory(
  row: Row<Transaction>,
  columnId: string,
  filterValue: string,
) {
  if (!filterValue || filterValue === "all") return true;

  return row.getValue(columnId) === filterValue;
}

function filterDate(
  row: Row<Transaction>,
  columnId: string,
  filterValue: string,
) {
  if (!filterValue) return true;

  const [startDateStr, endDateStr] = JSON.parse(filterValue) as [
    string,
    string,
  ];
  const startDate = startOfDay(new Date(startDateStr));
  const endDate = startOfDay(new Date(endDateStr));
  const transactionDate = startOfDay(new Date(row.getValue(columnId)));

  return startDate <= transactionDate && transactionDate <= endDate;
}

function sortDate(
  rowA: Row<Transaction>,
  rowB: Row<Transaction>,
  columnId: string,
) {
  return (
    new Date(rowA.getValue(columnId)).getTime() -
    new Date(rowB.getValue(columnId)).getTime()
  );
}

function sortAmount(
  rowA: Row<Transaction>,
  rowB: Row<Transaction>,
  columnId: string,
) {
  const valueA = rowA.getValue(columnId) as string;
  const valueB = rowB.getValue(columnId) as string;

  const amountA = parseFloat(valueA.slice(1));
  const amountB = parseFloat(valueB.slice(1));

  return amountA - amountB;
}

export { filterCategory, filterDate, sortAmount, sortDate };
