import { useStore } from "@tanstack/react-store";

import { transactionStore } from "../../transaction/store/transactionStore.ts";
import { budgetStore } from "../store/budgetStore.ts";

import {
  ListBalance,
  ListProgressChart,
  ListProgressInfo,
  ListRecentTransactions,
} from "./ListElements.tsx";

import type { Transaction } from "../../transaction/types/transaction.types.ts";
import type { Budget } from "../types/budget.types.ts";

import { filterTransactionsByBudget } from "../budget_helpers/BudgetHelpers.ts";

function ListBody() {
  const budgets: Budget[] = [...useStore(budgetStore, (s) => s.budgets)];
  const transactions: Transaction[] = [
    ...useStore(transactionStore, (s) => s.transactions),
  ];
  const selectedBudget: string = useStore(budgetStore, (s) => s.selectedBudget);

  const budget: Budget =
    budgets.find((b) => b.id === selectedBudget) || budgets[0];
  const { targetAmount, currency, theme, category, creationDate } = budget;

  const spentAmount = filterTransactionsByBudget(
    budget.creationDate,
    category,
    transactions,
  ).reduce((sum, t) => sum + t.amount, 0);

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

      <ListRecentTransactions category={category} creationDate={creationDate} />
    </div>
  );
}

export default ListBody;
