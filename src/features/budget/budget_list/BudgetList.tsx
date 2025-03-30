import { useStore } from "@tanstack/react-store";

import { budgetStore } from "../store/budgetStore.ts";

import ListBody from "./ListBody.tsx";
import ListHeader from "./ListHeader.tsx";

function BudgetList() {
  const { budgets, selectedBudget } = useStore(budgetStore, (state) => state);

  const budget = budgets.find((b) => b.id === selectedBudget) || budgets[0];

  return (
    <div
      key={budget.id}
      className="bg-shade-100 flex basis-7/12 flex-col gap-3 rounded-md px-6 py-4"
    >
      <ListHeader budget={budget} />

      <ListBody budget={budget} />
    </div>
  );
}

export default BudgetList;
