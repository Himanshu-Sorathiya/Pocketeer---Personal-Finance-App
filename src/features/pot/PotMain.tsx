import { useState } from "react";

import { useStore } from "@tanstack/react-store";

import { potStore } from "./store/potStore.ts";

import { getPots } from "./data/pot_data.ts";
import PotBoard from "./pot_board/PotBoard.tsx";
import PotFilter from "./pot_filter/PotFilter.tsx";
import PotSort from "./pot_sort/PotSort.tsx";

import type { Pot } from "./types/pot.types.ts";

import { filterPots, sortPots } from "./pot_helpers/potHelpers.ts";

function PotMain() {
  const [pots] = useState<Pot[]>(getPots());

  const filters = useStore(potStore, (s) => s.filters);
  const sorting = useStore(potStore, (s) => s.sorting);

  const filteredPots = filterPots(pots, filters);
  const sortedPots = sortPots(filteredPots, sorting);

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
