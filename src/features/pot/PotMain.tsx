import { useStore } from "@tanstack/react-store";

import { transactionStore } from "../transaction/store/transactionStore.ts";
import { potStore } from "./store/potStore.ts";

import PotBoard from "./pot_board/PotBoard.tsx";
import PotFilter from "./pot_filter/PotFilter.tsx";
import PotPlaceholder from "./pot_placeholder/PotPlaceholder.tsx";
import PotSort from "./pot_sort/PotSort.tsx";

import type { Transaction } from "../transaction/types/transaction.types.ts";
import type { FilterState, Pot, SortingState } from "./types/pot.types.ts";

import { filterPots, sortPots } from "./pot_helpers/potHelpers.ts";

function PotMain() {
  const pots: Pot[] = [...useStore(potStore, (s) => s.pots)];
  const transactions: Transaction[] = [
    ...useStore(transactionStore, (s) => s.transactions),
  ];

  const filters: FilterState[] = useStore(potStore, (s) => s.filters);
  const sorting: SortingState[] = useStore(potStore, (s) => s.sorting);

  const filteredPots: Pot[] = filterPots(pots, filters, transactions);
  const sortedPots: Pot[] = sortPots(filteredPots, sorting, transactions);

  const shouldShowPlaceholder = sortedPots.length === 0;

  return (
    <div className="flex flex-col gap-6 whitespace-nowrap">
      <div className="bg-shade-100 flex justify-between gap-8 overflow-visible rounded-md p-4">
        <PotFilter />

        <PotSort />
      </div>

      {shouldShowPlaceholder ? <PotPlaceholder /> : <PotBoard />}
    </div>
  );
}

export default PotMain;
