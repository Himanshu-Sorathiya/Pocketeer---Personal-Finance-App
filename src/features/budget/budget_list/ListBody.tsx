import { useStore } from "@tanstack/react-store";

import { useData } from "../../../contexts/DataContext.tsx";

import { budgetTransactionCacheStore } from "../../../store/appCacheStore.ts";

import {
  ListBalance,
  ListProgressChart,
  ListProgressInfo,
  ListRecentTransactions,
} from "./ListElements.tsx";

import type { Budget } from "../types/budget.types.ts";

function ListBody({ selectedBudgetId }: { selectedBudgetId: string }) {
  const { budgets } = useData();

  const budget: Budget =
    budgets!.find((b) => b.budgetId === selectedBudgetId) || budgets![0];
  const { targetAmount, currency, theme, category } = budget;

  const spentAmount =
    useStore(budgetTransactionCacheStore).get(budget.budgetId)?.amount ?? 0;

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

      <ListRecentTransactions id={budget.budgetId} category={category} />
    </div>
  );
}

export default ListBody;
