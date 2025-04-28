import { useStore } from "@tanstack/react-store";

import { budgetStore } from "../store/budgetStore.ts";

import ListBody from "./ListBody.tsx";
import ListHeader from "./ListHeader.tsx";

import type { Budget } from "../types/budget.types.ts";

function BudgetList({ selectedBudgetId }: { selectedBudgetId: string }) {
  const budgets: Budget[] = useStore(budgetStore, (s) => s.budgets);

  const budget: Budget =
    budgets.find((b) => b.budgetId === selectedBudgetId) || budgets![0];

  return (
    <div className="bg-shade-100 flex flex-col gap-3 rounded-md px-6 py-4">
      <ListHeader budget={budget} selectedBudgetId={selectedBudgetId} />

      <ListBody budget={budget} />
    </div>
  );
}

export default BudgetList;
