import { useState } from "react";

import { useStore } from "@tanstack/react-store";

import { potStore } from "./store/potStore.ts";

import { getPots } from "./data/pot_data.ts";
import PotBoard from "./pot_board/PotBoard.tsx";
import PotFilter from "./pot_filter/PotFilter.tsx";
import PotSort from "./pot_sort/PotSort.tsx";

import type { Pot } from "./types/pot.types.ts";

function PotMain() {
  const [pots] = useState<Pot[]>(getPots());

  const filters = useStore(potStore, (s) => s.filters);
  const sorting = useStore(potStore, (s) => s.sorting);

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
    const sortKey = sorting[0]?.id;
    const isDescending = sorting[0]?.desc;

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
        <PotFilter />

        <PotSort />
      </div>

      <PotBoard pots={sortedPots} />
    </div>
  );
}

export default PotMain;
