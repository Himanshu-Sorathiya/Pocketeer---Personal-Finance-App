import { useStore } from "@tanstack/react-store";

import { potTransactionCacheStore } from "../../../store/appCacheStore.ts";

import { useUser } from "../../auth/hooks/useUser.ts";

import {
  BoardBalance,
  BoardPotActions,
  BoardProgressChart,
  BoardProgressInfo,
} from "./BoardElements.tsx";

import type { Pot } from "../types/pot.types.ts";

function BoardBody({ pot }: { pot: Pot }) {
  const { currency_symbol } = useUser();

  const savedAmount =
    useStore(potTransactionCacheStore).get(pot.potId)?.amount ?? 0;

  return (
    <div className="flex flex-col">
      <BoardBalance
        savedAmount={savedAmount}
        targetAmount={pot.targetAmount}
        currency={currency_symbol}
      />

      <BoardProgressChart
        savedAmount={savedAmount}
        targetAmount={pot.targetAmount}
        theme={pot.theme}
        currency={currency_symbol}
      />

      <BoardProgressInfo
        savedAmount={savedAmount}
        targetAmount={pot.targetAmount}
        currency={currency_symbol}
      />

      <BoardPotActions
        potId={pot.potId}
        savedAmount={savedAmount}
        targetAmount={pot.targetAmount}
      />
    </div>
  );
}

export default BoardBody;
