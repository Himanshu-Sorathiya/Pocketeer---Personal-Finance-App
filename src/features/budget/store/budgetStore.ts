import { Store } from "@tanstack/react-store";

import type { Budget } from "../types/budget.types.ts";

type BudgetState = {
  budgets: Budget[];

  selectedBudgetId: string;
};

const budgetStore = new Store<BudgetState>({
  budgets: [],

  selectedBudgetId: "",
});

function setBudgets(budgets: Budget[]) {
  budgetStore.setState((prev) => ({
    ...prev,

    budgets,
    selectedBudgetId: budgets[0].budgetId,
  }));
}

function handleBudgetChange(newBudgetId: string) {
  budgetStore.setState((prev) => ({
    ...prev,

    selectedBudgetId: newBudgetId,
  }));
}

export { budgetStore, handleBudgetChange, setBudgets };
