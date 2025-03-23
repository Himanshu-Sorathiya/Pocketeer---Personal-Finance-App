import {
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";

import type { SelectedOptions } from "./../types/transaction.types.ts";

import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
} from "../../../utilities/dateUtils.ts";

type TransactionContextType = {
  columnFilters: ColumnFiltersState;
  sorting: SortingState;
  pagination: { pageIndex: number; pageSize: number };
  setColumnFilters: React.Dispatch<SetStateAction<ColumnFiltersState>>;
  setSorting: React.Dispatch<SetStateAction<SortingState>>;
  setPagination: React.Dispatch<
    SetStateAction<{ pageIndex: number; pageSize: number }>
  >;

  searchedRecipient: string;
  selectedCategory: SelectedOptions;
  selectedWeek: [Date, Date];
  selectedSort: SelectedOptions;

  handleSearchChange: (newValue: string) => void;
  handleCategoryChange: (_: string, newCategory: string) => void;
  handleDateRangeChange: (newRange: [Date, Date]) => void;
  handleSortChange: (type: string, value: string) => void;
};

const TransactionContext = createContext<TransactionContextType | null>(null);

function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [searchedRecipient, setSearchedRecipient] = useState<string>("");

  const [selectedCategory, setSelectedCategory] = useState<SelectedOptions>({
    type: "category",
    value: "all",
  });

  const [selectedWeek, setSelectedWeek] = useState<[Date, Date]>([
    DEFAULT_START_DATE,
    DEFAULT_END_DATE,
  ]);

  const [selectedSort, setSelectedSort] = useState<SelectedOptions>({
    type: "date",
    value: "latest",
  });

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

  return (
    <TransactionContext.Provider
      value={{
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
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

function useTransactionContext() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider",
    );
  }

  return context;
}

export { TransactionProvider, useTransactionContext };
