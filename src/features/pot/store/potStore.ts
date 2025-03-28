import { Store } from "@tanstack/react-store";

import type { SelectedOptions } from "../../../types/global.types.ts";
import type { FilterState, SortingState } from "../types/pot.types.ts";

type PotState = {
  searchedPot: string;
  selectedStatus: SelectedOptions;
  selectedSort: SelectedOptions;

  filters: FilterState[];
  sorting: SortingState[];
};

const potStore = new Store<PotState>({
  searchedPot: "",
  selectedStatus: { type: "status", value: "all" },
  selectedSort: { type: "progress", value: "highest" },

  filters: [
    { id: "search", value: "" },
    { id: "status", value: "all" },
  ],
  sorting: [{ id: "progress", desc: true }],
});

function updateFilter(search: string, status: string) {
  potStore.setState((prev) => ({
    ...prev,

    searchedPot: search,
    selectedStatus: { type: "status", value: status },

    filters: [
      { id: "search", value: search },
      { id: "status", value: status },
    ],
  }));
}

function updateSorter(type: string, value: string) {
  potStore.setState((prev) => ({
    ...prev,

    selectedSort: { type, value },

    sorting: [{ id: type, desc: value === "highest" }],
  }));
}

function handleSearchChange(newValue: string) {
  updateFilter(newValue, potStore.state.selectedStatus.value);
}

function handleStatusChange(_: string, newStatus: string) {
  updateFilter(potStore.state.searchedPot, newStatus);
}

function handleSortChange(type: string, value: string) {
  updateSorter(type, value);
}

export { handleSearchChange, handleSortChange, handleStatusChange, potStore };
