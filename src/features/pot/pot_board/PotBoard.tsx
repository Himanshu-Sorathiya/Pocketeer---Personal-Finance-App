import { useStore } from "@tanstack/react-store";

import { potTransactionCacheStore } from "../../../store/appCacheStore.ts";
import { potStore } from "../store/potStore.ts";

import { useReadPots } from "../hooks/useReadPots.ts";

import BoardBody from "./BoardBody.tsx";
import { BoardBadge } from "./BoardElements.tsx";
import BoardHeader from "./BoardHeader.tsx";

import PotPlaceholder from "../pot_placeholder/PotPlaceholder.tsx";

import type { FilterState, Pot, SortingState } from "../types/pot.types.ts";

import { filterPots, sortPots } from "../pot_helpers/potHelpers.ts";

function PotBoard() {
  const { pots } = useReadPots();

  const potTransactionCache = useStore(potTransactionCacheStore);

  const filters: FilterState[] = useStore(potStore, (s) => s.filters);
  const sorting: SortingState[] = useStore(potStore, (s) => s.sorting);

  const filteredPots: Pot[] = filterPots(
    [...pots],
    filters,
    potTransactionCache,
  );
  const sortedPots: Pot[] = sortPots(
    filteredPots,
    sorting,
    potTransactionCache,
  );

  const shouldShowPlaceholder = sortedPots.length === 0;

  if (shouldShowPlaceholder) return <PotPlaceholder />;

  return (
    <div className="grid min-w-full grid-cols-3 gap-4">
      {sortedPots.map((pot) => {
        const savedAmount = potTransactionCache.get(pot.potId)?.amount ?? 0;

        return (
          <div
            key={pot.potId}
            className="bg-shade-100 relative flex flex-col gap-3 rounded-md px-6 py-4"
          >
            <BoardHeader pot={pot} />

            <BoardBody pot={pot} />

            <BoardBadge
              savedAmount={savedAmount}
              targetAmount={pot.targetAmount}
            />
          </div>
        );
      })}
    </div>
  );
}

export default PotBoard;
