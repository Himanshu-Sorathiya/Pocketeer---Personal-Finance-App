import { useState } from "react";

import { getPots } from "./data/pot_data.ts";
import PotBoard from "./pot_board/PotBoard.tsx";
import PotFilter from "./pot_filter/PotFilter.tsx";

import type { SelectedOptions } from "../../types/global.types.ts";
import PotSort from "./pot_sort/PotSort.tsx";
import type { FilterState, Pot, SortingState } from "./types/pot.types.ts";

function PotMain() {
  const [pots] = useState<Pot[]>(getPots());

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
    const sorter: SortingState[] = [
      { id: type, desc: ["lowest"].includes(value) },
    ];

    setSorting(sorter);
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

  const filteredPots = pots.filter((pot) => {
    const searchFilter =
      filters.find((f) => f.id === "search")?.value.toLowerCase() || "";
    const statusFilter = filters.find((f) => f.id === "status")?.value;

    return (
      pot.name.toLowerCase().includes(searchFilter) &&
      (statusFilter === "all" ||
        (statusFilter === "completed" && pot.savedAmount >= pot.targetAmount) ||
        (statusFilter === "ongoing" && pot.savedAmount < pot.targetAmount))
    );
  });

  const sortedPots = filteredPots.sort((a, b) => {
    const sortKey = selectedSort.type;
    const isDescending = selectedSort.value === "highest";

    if (sortKey === "target") {
      return isDescending
        ? b.targetAmount - a.targetAmount
        : a.targetAmount - b.targetAmount;
    } else if (sortKey === "progress") {
      return isDescending
        ? b.savedAmount / b.targetAmount - a.savedAmount / a.targetAmount
        : a.savedAmount / a.targetAmount - b.savedAmount / b.targetAmount;
    }
    return 0;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-shade-100 flex justify-between overflow-visible rounded-md p-4">
        <PotFilter
          selectedStatus={selectedStatus}
          handleSearchChange={handleSearchChange}
          handleStatusChange={handleStatusChange}
        />

        <PotSort
          selectedSort={selectedSort}
          handleSortChange={handleSortChange}
        />
      </div>

      <PotBoard pots={sortedPots} />
    </div>
  );
}

export default PotMain;
