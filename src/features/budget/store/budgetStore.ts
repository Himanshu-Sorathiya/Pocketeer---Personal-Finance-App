import { Store } from "@tanstack/react-store";

import { getBudgets } from "../data/budget_data.ts";

import type { Budget } from "../types/budget.types.ts";

type BudgetState = {
  budgets: Budget[];
  selectedBudget: string;
};

const budgets = getBudgets();

const budgetStore = new Store<BudgetState>({
  budgets,
  selectedBudget: budgets.length > 0 ? budgets[0].id : "",
});

function handleBudgetChange(newValue: string) {
  budgetStore.setState((prev) => ({
    ...prev,
    selectedBudget: newValue,
  }));
}

export { budgetStore, handleBudgetChange };
