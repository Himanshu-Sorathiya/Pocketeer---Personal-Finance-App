import { useStore } from "@tanstack/react-store";

import { budgetStore } from "../store/budgetStore.ts";

import ListActions from "./ListActions.tsx";

import type { Budget } from "../types/budget.types.ts";

function ListHeader() {
  const budgets: Budget[] = [...useStore(budgetStore, (s) => s.budgets)];
  const selectedBudget: string = useStore(budgetStore, (s) => s.selectedBudget);

  const budget: Budget =
    budgets.find((b) => b.id === selectedBudget) || budgets[0];

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div
          className="size-4 rounded-full"
          style={{ backgroundColor: budget.theme }}
        ></div>

        <div className="text-lg font-medium text-gray-900">
          {budget.category
            .split("_")
            .map(
              (part) =>
                part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
            )
            .join(" & ")}
        </div>
      </div>

      <ListActions />
    </div>
  );
}

export default ListHeader;
