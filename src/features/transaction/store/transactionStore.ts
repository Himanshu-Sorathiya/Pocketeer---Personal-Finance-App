import { Store } from "@tanstack/react-store";
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

import type { SelectedOptions } from "../../../types/global.types.ts";

import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
} from "../../../utilities/dateUtils.ts";

type TransactionState = {
  searchedRecipient: string;
  selectedCategory: SelectedOptions;
  selectedWeek: [Date, Date];
  selectedSort: SelectedOptions;

  columnFilters: ColumnFiltersState;
  sorting: SortingState;
  pagination: PaginationState;

  maxSearchLength: number;
};

const transactionStore = new Store<TransactionState>({
  searchedRecipient: "",
  selectedCategory: { type: "category", value: "all" },
  selectedWeek: [DEFAULT_START_DATE, DEFAULT_END_DATE],
  selectedSort: { type: "date", value: "latest" },

  columnFilters: [
    { id: "recipient", value: "" },
    {
      id: "date",
      value: JSON.stringify([DEFAULT_START_DATE, DEFAULT_END_DATE]),
    },
    { id: "category", value: "all" },
  ],
  sorting: [{ id: "date", desc: true }],
  pagination: { pageIndex: 0, pageSize: 10 },

  maxSearchLength: 15,
});

function updateFilter(search: string, category: string, week: [Date, Date]) {
  transactionStore.setState((prev) => ({
    ...prev,

    searchedRecipient: search,
    selectedCategory: { type: "category", value: category },
    selectedWeek: week,

    columnFilters: [
      { id: "recipient", value: search },
      { id: "date", value: JSON.stringify(week) },
      { id: "category", value: category },
    ],
  }));
}

function updateSorter(type: string, value: string) {
  transactionStore.setState((prev) => ({
    ...prev,

    selectedSort: { type, value },

    sorting: [{ id: type, desc: ["latest", "highest"].includes(value) }],
  }));
}

function handleSearchChange(newValue: string) {
  if (newValue.length > transactionStore.state.maxSearchLength) return;

  updateFilter(
    newValue,
    transactionStore.state.selectedCategory.value,
    transactionStore.state.selectedWeek,
  );
}

function handleCategoryChange(_: string, newCategory: string) {
  updateFilter(
    transactionStore.state.searchedRecipient,
    newCategory,
    transactionStore.state.selectedWeek,
  );
}

function handleDateRangeChange(newRange: [Date, Date]) {
  updateFilter(
    transactionStore.state.searchedRecipient,
    transactionStore.state.selectedCategory.value,
    newRange,
  );
}

function handleSortChange(type: string, value: string) {
  updateSorter(type, value);
}

export {
  handleCategoryChange,
  handleDateRangeChange,
  handleSearchChange,
  handleSortChange,
  transactionStore,
};
