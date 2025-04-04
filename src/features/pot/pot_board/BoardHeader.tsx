import { useStore } from "@tanstack/react-store";

import { transactionStore } from "../../transaction/store/transactionStore.ts";

import BoardActions from "./BoardActions.tsx";

import type { Transaction } from "../../transaction/types/transaction.types.ts";
import type { Pot } from "../types/pot.types.ts";

import { filterTransactionsByPot } from "../pot_helpers/potHelpers.ts";

function BoardHeader({ pot }: { pot: Pot }) {
  const transactions: Transaction[] = [
    ...useStore(transactionStore, (s) => s.transactions),
  ];

  const savedAmount = filterTransactionsByPot(
    pot.name,
    pot.creationDate,
    transactions,
  ).reduce((sum, t) => sum + t.amount, 0);

  return (
    <div key={pot.id} className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div
          className="flex size-8 items-center justify-center rounded-full"
          style={{ backgroundColor: pot.theme }}
        >
          {savedAmount === pot.targetAmount ? (
            <svg className="h-6 w-6">
              <use href="/src/assets/icons/ui_icons_sprite.svg#trophy" />
            </svg>
          ) : (
            <svg className="h-6 w-6">
              <use href="/src/assets/icons/ui_icons_sprite.svg#cube" />
            </svg>
          )}
        </div>

        <div className="text-lg font-medium text-gray-900">{pot.name}</div>
      </div>

      <BoardActions />
    </div>
  );
}

export default BoardHeader;
