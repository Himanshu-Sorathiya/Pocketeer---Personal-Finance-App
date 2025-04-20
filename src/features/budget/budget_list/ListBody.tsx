import { useStore } from "@tanstack/react-store";

import { budgetTransactionCacheStore } from "../../../store/appCacheStore.ts";
import { budgetStore } from "../store/budgetStore.ts";

import {
  ListBalance,
  ListProgressChart,
  ListProgressInfo,
  ListRecentTransactions,
} from "./ListElements.tsx";

import type { Budget } from "../types/budget.types.ts";

function ListBody() {
  const budgets: Budget[] = [...useStore(budgetStore, (s) => s.budgets)];
  const selectedBudget: string = useStore(budgetStore, (s) => s.selectedBudget);

  const budget: Budget =
    budgets.find((b) => b.budgetId === selectedBudget) || budgets[0];
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
