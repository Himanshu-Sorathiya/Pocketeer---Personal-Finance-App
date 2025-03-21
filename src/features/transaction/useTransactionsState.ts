import { useState } from "react";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";

import type { SelectedOptions } from "./types/transaction.types.ts";

import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
} from "../../utilities/dateUtils.ts";

function useTransactionState() {
  const [selectedSort, setSelectedSort] = useState<SelectedOptions>({
    type: "date",
    value: "latest",
  });

  const [selectedCategory, setSelectedCategory] = useState<SelectedOptions>({
    type: "category",
    value: "all",
  });

  const [searchedRecipient, setSearchedRecipient] = useState<string>("");

  const [selectedWeek, setSelectedWeek] = useState<[Date, Date]>([
    DEFAULT_START_DATE,
    DEFAULT_END_DATE,
  ]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = [
      { id: "recipient", value: searchedRecipient },
      { id: "date", value: JSON.stringify(selectedWeek) },
    ];

    if (selectedCategory.value !== "all") {
      filters.push({ id: "category", value: selectedCategory.value });
    }

    return filters;
  });

  const [sorting, setSorting] = useState<SortingState>(() => {
    const sorts: SortingState = [
      {
        id: selectedSort.type,
        desc: ["latest", "highest"].includes(selectedSort.value),
      },
    ];

    return sorts;
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  function updateFilter(
    search: string,
    category: string,
    dateRange: [Date, Date],
  ) {
    const filters: ColumnFiltersState = [
      { id: "recipient", value: search },
      { id: "date", value: JSON.stringify(dateRange) },
    ];

    if (category !== "all") {
      filters.push({ id: "category", value: category });
    }

    setColumnFilters(filters);
  }

  function updateSorter(type: string, value: string) {
    const sorter: SortingState = [
      { id: type, desc: ["latest", "highest"].includes(value) },
    ];

    setSorting(sorter);
  }

  function handleSearchChange(newValue: string) {
    setSearchedRecipient(newValue);
    updateFilter(newValue, selectedCategory.value, selectedWeek);
  }

  function handleCategoryChange(_: string, newCategory: string) {
    setSelectedCategory({ type: "category", value: newCategory });
    updateFilter(searchedRecipient, newCategory, selectedWeek);
  }

  function handleDateRangeChange(newRange: [Date, Date]) {
    setSelectedWeek(newRange);
    updateFilter(searchedRecipient, selectedCategory.value, newRange);
  }

  function handleSortChange(type: string, value: string) {
    setSelectedSort({ type, value });
    updateSorter(type, value);
  }

  return {
    columnFilters,
    sorting,
    pagination,
    setColumnFilters,
    setSorting,
    setPagination,

    searchedRecipient,
    selectedCategory,
    selectedWeek,
    selectedSort,

    handleSearchChange,
    handleCategoryChange,
    handleDateRangeChange,
    handleSortChange,
  };
}

export { useTransactionState };
