import { useStore } from "@tanstack/react-store";

import { Route as BudgetRoute } from "../../../routes/app/budget.tsx";

import { budgetStore } from "../../budget/store/budgetStore.ts";

import SummeryHeader from "../../../components/ui/SummeryHeader.tsx";
import BudgetPieChart from "../../budget/budget_pie_chart/BudgetPieChart.tsx";

import type { Budget } from "../../budget/types/budget.types.ts";

import { filterTransactionsByBudget } from "../../budget/budget_helpers/BudgetHelpers.ts";

function SummeryBudget() {
  return (
    <div className="bg-shade-100 flex flex-col gap-4 rounded-md px-6 pt-7 pb-3">
      <SummeryHeader
        to={BudgetRoute.to}
        header="Budgets"
        label="Track"
        onClick={() => {}}
        headerClass="text-2xl"
      />

      <div className="grid grid-cols-[3fr_2fr] gap-4">
        <BudgetPieChart />

        <BudgetSummery />
      </div>
    </div>
  );
}

function BudgetSummery() {
  const budgets: Budget[] = [...useStore(budgetStore, (s) => s.budgets)]
    .sort((a, b) => {
      const spentA = filterTransactionsByBudget(
        a.creationDate,
        a.category,
      ).reduce((sum, t) => sum + t.amount, 0);
      const spentB = filterTransactionsByBudget(
        b.creationDate,
        b.category,
      ).reduce((sum, t) => sum + t.amount, 0);

      const percentA = spentA / a.targetAmount;
      const percentB = spentB / b.targetAmount;

      return percentB - percentA;
    })
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-2">
      {budgets.map((budget) => {
        const spentAmount = filterTransactionsByBudget(
          budget.creationDate,
          budget.category,
        ).reduce((sum, t) => sum + t.amount, 0);

        return (
          <div
            key={budget.id}
            className="flex items-center gap-3 rounded-md px-2 py-1.5"
          >
            <div
              className="h-10 w-1 rounded-sm"
              style={{ backgroundColor: budget.theme }}
            ></div>

            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500">
                {budget.category
                  .split("_")
                  .map(
                    (part) =>
                      part.charAt(0).toUpperCase() +
                      part.slice(1).toLowerCase(),
                  )
                  .join(" & ")}
              </span>

              <span className="font-space-grotesk text-lg font-semibold text-gray-900">
                {budget.currency}
                {spentAmount}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SummeryBudget;
