import { useState } from 'react';

import { getPots } from './data/pot_data.ts';
import PotBoard from "./pot_board/PotBoard.tsx";
import PotFilter from "./pot_filter/PotFilter.tsx";

import type { SelectedOptions } from "../../types/global.types.ts";
import type { FilterState, Pot } from "./types/pot.types.ts";

function PotMain() {
  const [pots] = useState<Pot[]>(getPots());

  const [searchedPot, setSearchedPot] = useState<string>("");

  const [selectedStatus, setSelectedStatus] = useState<SelectedOptions>({
    type: "status",
    value: "all",
  });

  const [filters, setFilters] = useState<FilterState[]>([
    { id: "search", value: searchedPot },
    { id: "status", value: selectedStatus.value },
  ]);

  function updateFilter(search: string, status: string) {
    const filters: FilterState[] = [
      { id: "search", value: search },
      { id: "status", value: status },
    ];

    setFilters(filters);
  }

  function handleSearchChange(newValue: string) {
    setSearchedPot(newValue);
    updateFilter(newValue, selectedStatus.value);
  }

  function handleStatusChange(_: string, newStatus: string) {
    setSelectedStatus({ type: "status", value: newStatus });
    updateFilter(searchedPot, newStatus);
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

  return (
    <div className="flex flex-col gap-4">
      <PotFilter
        handleSearchChange={handleSearchChange}
        handleStatusChange={handleStatusChange}
        selectedStatus={selectedStatus}
      />

      <PotBoard pots={filteredPots} />
    </div>
  );
}

export default PotMain;
