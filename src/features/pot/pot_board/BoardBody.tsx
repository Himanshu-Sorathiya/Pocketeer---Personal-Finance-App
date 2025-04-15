import { useStore } from "@tanstack/react-store";

import { potTransactionCacheStore } from "../../../store/appCacheStore.ts";

import {
  BoardBalance,
  BoardPotActions,
  BoardProgressChart,
  BoardProgressInfo,
} from "./BoardElements.tsx";

import type { Pot } from "../types/pot.types.ts";

function BoardBody({ pot }: { pot: Pot }) {
  const savedAmount =
    useStore(potTransactionCacheStore).get(pot.id)?.amount ?? 0;

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
