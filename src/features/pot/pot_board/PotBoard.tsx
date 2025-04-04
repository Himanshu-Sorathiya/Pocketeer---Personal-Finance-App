import { useStore } from "@tanstack/react-store";

import { transactionStore } from "../../transaction/store/transactionStore.ts";
import { potStore } from "../store/potStore.ts";

import BoardBody from "./BoardBody.tsx";
import { BoardBadge } from "./BoardElements.tsx";
import BoardHeader from "./BoardHeader.tsx";

import type { Transaction } from "../../transaction/types/transaction.types.ts";
import type { FilterState, Pot, SortingState } from "../types/pot.types.ts";

import {
  filterPots,
  filterTransactionsByPot,
  sortPots,
} from "../pot_helpers/potHelpers.ts";

function PotBoard() {
  const pots: Pot[] = [...useStore(potStore, (s) => s.pots)];
  const transactions: Transaction[] = [
    ...useStore(transactionStore, (s) => s.transactions),
  ];

  const filters: FilterState[] = useStore(potStore, (s) => s.filters);
  const sorting: SortingState[] = useStore(potStore, (s) => s.sorting);

  const filteredPots: Pot[] = filterPots(pots, filters, transactions);
  const sortedPots: Pot[] = sortPots(filteredPots, sorting, transactions);

  return (
    <div className="grid min-w-full grid-cols-3 gap-4">
      {sortedPots.map((pot) => {
        const savedAmount = filterTransactionsByPot(
          pot.name,
          pot.creationDate,
          transactions,
        ).reduce((sum, t) => sum + t.amount, 0);

        return (
          <div
            key={pot.id}
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
