import { createContext, useContext, useState } from "react";
import type { SelectedOptions } from "../../../types/global.types.ts";
import type { FilterState, SortingState } from "../types/pot.types.ts";

// Define context types
type PotContextType = {
  filters: FilterState[];
  sorting: SortingState[];

  searchedPot: string;
  selectedStatus: SelectedOptions;
  selectedSort: SelectedOptions;

  handleSearchChange: (newValue: string) => void;
  handleStatusChange: (_: string, newStatus: string) => void;
  handleSortChange: (type: string, value: string) => void;
};

const PotContext = createContext<PotContextType | null>(null);

function PotProvider({ children }: { children: React.ReactNode }) {
  const [searchedPot, setSearchedPot] = useState<string>("");

  const [selectedStatus, setSelectedStatus] = useState<SelectedOptions>({
    type: "status",
    value: "all",
  });

  const [selectedSort, setSelectedSort] = useState<SelectedOptions>({
    type: "progress",
    value: "highest",
  });

  const [filters, setFilters] = useState<FilterState[]>([
    { id: "search", value: searchedPot },
    { id: "status", value: selectedStatus.value },
  ]);

  const [sorting, setSorting] = useState<SortingState[]>([
    {
      id: selectedSort.type,
      desc: ["lowest"].includes(selectedSort.value),
    },
  ]);

  function updateFilter(search: string, status: string) {
    const filters: FilterState[] = [
      { id: "search", value: search },
      { id: "status", value: status },
    ];

    setFilters(filters);
  }

  function updateSorter(type: string, value: string) {
    const sorting: SortingState[] = [
      { id: type, desc: ["lowest"].includes(value) },
    ];

    setSorting(sorting);
  }

  function handleSearchChange(newValue: string) {
    setSearchedPot(newValue);
    updateFilter(newValue, selectedStatus.value);
  }

  function handleStatusChange(_: string, newStatus: string) {
    setSelectedStatus({ type: "status", value: newStatus });
    updateFilter(searchedPot, newStatus);
  }

  function handleSortChange(type: string, value: string) {
    setSelectedSort({ type, value });
    updateSorter(type, value);
  }

  return (
    <PotContext.Provider
      value={{
        filters,
        sorting,

        searchedPot,
        selectedStatus,
        selectedSort,

        handleSearchChange,
        handleStatusChange,
        handleSortChange,
      }}
    >
      {children}
    </PotContext.Provider>
  );
}

function usePotContext() {
  const context = useContext(PotContext);

  if (!context) {
    throw new Error("usePotContext must be used within a PotProvider");
  }

  return context;
}

export { PotProvider, usePotContext };
