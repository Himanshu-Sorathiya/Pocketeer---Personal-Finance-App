import { Store } from "@tanstack/react-store";

import { getBudgets } from "../../../services/apiBudget.ts";

import type { Budget } from "../types/budget.types.ts";

type BudgetState = {
  budgets: Budget[];
  selectedBudget: string;
};

const budgets: Budget[] = await getBudgets({
  queryKey: ["", "e8c67e26-6d1e-4fd5-9a87-2bf852cb2c35"],
});

const budgetStore = new Store<BudgetState>({
  budgets,

  selectedBudget: budgets.length > 0 ? budgets[0].budgetId : "",
});

function handleBudgetChange(newValue: string) {
  budgetStore.setState((prev) => ({
    ...prev,
    selectedBudget: newValue,
  }));
}

export { budgetStore, handleBudgetChange };
