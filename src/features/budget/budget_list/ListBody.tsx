import { useStore } from "@tanstack/react-store";

import { budgetTransactionCacheStore } from "../../../store/appCacheStore.ts";

import {
  ListBalance,
  ListProgressChart,
  ListProgressInfo,
  ListRecentTransactions,
} from "./ListElements.tsx";

import type { Budget } from "../types/budget.types.ts";

function ListBody({ budget }: { budget: Budget }) {
  const { budgetId, targetAmount, currency, theme, category } = budget;

  const spentAmount =
    useStore(budgetTransactionCacheStore).get(budgetId)?.amount ?? 0;

  return (
    <div className="flex flex-col gap-3">
      <ListBalance targetAmount={targetAmount} currency={currency} />

      <ListProgressChart
        spentAmount={spentAmount}
        targetAmount={targetAmount}
        currency={currency}
        theme={theme}
      />

      <ListProgressInfo
        spentAmount={spentAmount}
        targetAmount={targetAmount}
        currency={currency}
        theme={theme}
      />

      <ListRecentTransactions budgetId={budget.budgetId} category={category} />
    </div>
  );
}

export default ListBody;
