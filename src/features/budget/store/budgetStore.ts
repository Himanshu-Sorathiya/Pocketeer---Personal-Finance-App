import { Store } from "@tanstack/react-store";

type BudgetState = {
  selectedBudgetId: string;
};

const budgetStore = new Store<BudgetState>({
  selectedBudgetId: "",
});

function handleBudgetChange(newBudgetId: string) {
  budgetStore.setState((prev) => ({
    ...prev,

    selectedBudgetId: newBudgetId,
  }));
}

export { budgetStore, handleBudgetChange };
