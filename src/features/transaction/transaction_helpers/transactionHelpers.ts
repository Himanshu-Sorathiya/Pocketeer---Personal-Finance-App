import {
  type RankingInfo,
  compareItems,
  rankItem,
} from "@tanstack/match-sorter-utils";
import {
  type ColumnFiltersState,
  type FilterFn,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type SortingFn,
  type SortingState,
  sortingFns,
} from "@tanstack/react-table";
import { startOfDay } from "date-fns";

import { transactionStore } from "../store/transactionStore.ts";

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

const filterFuzzy: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });

  return itemRank?.passed;
};

function filterAmount(
  row: Row<Transaction>,
  _: string,
  filterValue: "all" | "income" | "expense",
) {
  if (filterValue === "all") return true;

  return row.original.type === filterValue;
}

function sortDate(
  rowA: Row<Transaction>,
  rowB: Row<Transaction>,
  columnId: string,
) {
  const dateA = new Date(rowA.getValue(columnId)).getTime();
  const dateB = new Date(rowB.getValue(columnId)).getTime();

  if (dateA === dateB) {
    const timeA = rowA.original.creationTime.split(":").join("");
    const timeB = rowB.original.creationTime.split(":").join("");

    return Number(timeA) - Number(timeB);
  }

  return dateA - dateB;
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

const sortFuzzy: SortingFn<any> = (rowA, rowB, columnId) => {
  const metaA = rowA.columnFiltersMeta[columnId] as { itemRank?: RankingInfo };
  const metaB = rowB.columnFiltersMeta[columnId] as { itemRank?: RankingInfo };

  let dir = 0;

  if (metaA?.itemRank && metaB?.itemRank) {
    dir = compareItems(metaA.itemRank, metaB.itemRank);
  }

  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const setColumnFilters: OnChangeFn<ColumnFiltersState> = (updaterOrValue) => {
  transactionStore.setState((prev) => ({
    ...prev,
    columnFilters:
      typeof updaterOrValue === "function"
        ? updaterOrValue(prev.columnFilters)
        : updaterOrValue,
  }));
};

const setSorting: OnChangeFn<SortingState> = (updaterOrValue) => {
  transactionStore.setState((prev) => ({
    ...prev,
    sorting:
      typeof updaterOrValue === "function"
        ? updaterOrValue(prev.sorting)
        : updaterOrValue,
  }));
};

const setPagination: OnChangeFn<PaginationState> = (updaterOrValue) => {
  transactionStore.setState((prev) => ({
    ...prev,
    pagination:
      typeof updaterOrValue === "function"
        ? updaterOrValue(prev.pagination)
        : updaterOrValue,
  }));
};

export {
  filterAmount,
  filterCategory,
  filterDate,
  filterFuzzy,
  setColumnFilters,
  setPagination,
  setSorting,
  sortAmount,
  sortDate,
  sortFuzzy,
};
