import { useStore } from "@tanstack/react-store";

import { transactionStore } from "../../transaction/store/transactionStore.ts";

import {
  BoardBalance,
  BoardPotActions,
  BoardProgressChart,
  BoardProgressInfo,
} from "./BoardElements.tsx";

import type { Transaction } from "../../transaction/types/transaction.types.ts";
import type { Pot } from "../types/pot.types.ts";

import { filterTransactionsByPot } from "../pot_helpers/potHelpers.ts";

function BoardBody({ pot }: { pot: Pot }) {
  const transactions: Transaction[] = [
    ...useStore(transactionStore, (s) => s.transactions),
  ];

  const savedAmount = filterTransactionsByPot(
    pot.name,
    pot.creationDate,
    transactions,
  ).reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="flex flex-col">
      <BoardBalance
        currency={pot.currency}
        savedAmount={savedAmount}
        targetAmount={pot.targetAmount}
      />

      <BoardProgressChart
        savedAmount={savedAmount}
        targetAmount={pot.targetAmount}
        theme={pot.theme}
        currency={pot.currency}
      />

      <BoardProgressInfo
        savedAmount={savedAmount}
        targetAmount={pot.targetAmount}
        currency={pot.currency}
      />

      <BoardPotActions
        potId={pot.id}
        savedAmount={savedAmount}
        targetAmount={pot.targetAmount}
      />
    </div>
  );
}

export default BoardBody;
