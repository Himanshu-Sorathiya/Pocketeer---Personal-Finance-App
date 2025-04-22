import { Store } from "@tanstack/react-store";

import { getPots } from "../../../services/apiPot.ts";

import type { SelectedOptions } from "../../../types/global.types.ts";
import type { FilterState, Pot, SortingState } from "../types/pot.types.ts";

type PotState = {
  pots: Pot[];

  searchedPot: string;
  selectedStatus: SelectedOptions;
  selectedSort: SelectedOptions;

  filters: FilterState[];
  sorting: SortingState[];

  maxSearchLength: number;
};

const pots: Pot[] = await getPots("e8c67e26-6d1e-4fd5-9a87-2bf852cb2c35");

const potStore = new Store<PotState>({
  pots,

  searchedPot: "",
  selectedStatus: { type: "status", value: "all" },
  selectedSort: { type: "progress", value: "highest" },

  filters: [
    { id: "search", value: "" },
    { id: "status", value: "all" },
  ],
  sorting: [{ id: "progress", desc: true }],

  maxSearchLength: 15,
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

    sorting: [{ id: type, desc: ["highest"].includes(value) }],
  }));
}

function handleSearchChange(newValue: string) {
  if (newValue.length > potStore.state.maxSearchLength) return;

  updateFilter(newValue, potStore.state.selectedStatus.value);
}

function handleStatusChange(_: string, newStatus: string) {
  updateFilter(potStore.state.searchedPot, newStatus);
}

function handleSortChange(newType: string, newValue: string) {
  updateSorter(newType, newValue);
}

export { handleSearchChange, handleSortChange, handleStatusChange, potStore };
