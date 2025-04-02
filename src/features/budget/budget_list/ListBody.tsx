import { useStore } from "@tanstack/react-store";

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
    budgets.find((b) => b.id === selectedBudget) || budgets[0];
  const { targetAmount, spentAmount, currency, theme, category } = budget;

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

      <ListRecentTransactions category={category} />
    </div>
  );
}

export default ListBody;
