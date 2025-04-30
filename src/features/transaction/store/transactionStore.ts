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
  selectedType: SelectedOptions;
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
  selectedType: { type: "type", value: "all" },
  selectedSort: { type: "date", value: "latest" },

  columnFilters: [
    { id: "recipient", value: "" },
    { id: "category", value: "all" },
    {
      id: "date",
      value: JSON.stringify([DEFAULT_START_DATE, DEFAULT_END_DATE]),
    },
    { id: "amount", value: "all" },
  ],
  sorting: [{ id: "date", desc: true }],
  pagination: { pageIndex: 0, pageSize: 10 },

  maxSearchLength: 15,
});

function updateFilter(
  search: string,
  category: string,
  week: [Date, Date],
  type: string,
) {
  transactionStore.setState((prev) => ({
    ...prev,

    searchedRecipient: search,
    selectedCategory: { type: "category", value: category },
    selectedWeek: week,
    selectedType: { type: "type", value: type },

    columnFilters: [
      { id: "recipient", value: search },
      { id: "date", value: JSON.stringify(week) },
      { id: "category", value: category },
      { id: "amount", value: type },
    ],

    pagination: { ...prev.pagination, pageIndex: 0 },
  }));
}

function updateSorter(type: string, value: string) {
  transactionStore.setState((prev) => ({
    ...prev,

    selectedSort: { type, value },

    sorting: [{ id: type, desc: ["latest", "highest"].includes(value) }],

    pagination: { ...prev.pagination, pageIndex: 0 },
  }));
}

function updatePaginator(pageIndex: number, pageSize: number) {
  transactionStore.setState((prev) => ({
    ...prev,

    pagination: { pageIndex: pageIndex, pageSize: pageSize },
  }));
}

function handleSearchChange(newValue: string) {
  if (newValue.length > transactionStore.state.maxSearchLength) return;

  updateFilter(
    newValue,
    transactionStore.state.selectedCategory.value,
    transactionStore.state.selectedWeek,
    transactionStore.state.selectedType.value,
  );
}

function handleCategoryChange(_: string, newCategory: string) {
  updateFilter(
    transactionStore.state.searchedRecipient,
    newCategory,
    transactionStore.state.selectedWeek,
    transactionStore.state.selectedType.value,
  );
}

function handleDateRangeChange(newRange: [Date, Date]) {
  updateFilter(
    transactionStore.state.searchedRecipient,
    transactionStore.state.selectedCategory.value,
    newRange,
    transactionStore.state.selectedType.value,
  );
}

function handleTypeChange(_: string, newType: string) {
  updateFilter(
    transactionStore.state.searchedRecipient,
    transactionStore.state.selectedCategory.value,
    transactionStore.state.selectedWeek,
    newType,
  );
}

function handleSortChange(newType: string, newValue: string) {
  updateSorter(newType, newValue);
}

function handlePageIndexChange(newPageIndex: number) {
  updatePaginator(newPageIndex, transactionStore.state.pagination.pageSize);
}

function handlePageSizeChange(newPageSize: number) {
  updatePaginator(transactionStore.state.pagination.pageIndex, newPageSize);
}

export {
  handleCategoryChange,
  handleDateRangeChange,
  handlePageIndexChange,
  handlePageSizeChange,
  handleSearchChange,
  handleSortChange,
  handleTypeChange,
  transactionStore,
};
