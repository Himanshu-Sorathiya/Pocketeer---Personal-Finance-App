import { useStore } from "@tanstack/react-store";

import { Route as BudgetRoute } from "../../../routes/app/budget.tsx";

import { budgetTransactionCacheStore } from "../../../store/appCacheStore.ts";

import { useBudgets } from "../../../hooks/useBudgets.ts";

import GlobalSpinner from "../../../components/loaders/GlobalSpinner.tsx";
import SummeryHeader from "../../../components/ui/SummeryHeader.tsx";
import BudgetPieChart from "../../budget/budget_pie_chart/BudgetPieChart.tsx";

import type { Budget } from "../../budget/types/budget.types.ts";

import { themeColors } from "../../../constants/appOptions.ts";

function SummeryBudget() {
  const budgetTransactionCache = useStore(budgetTransactionCacheStore);

  const { budgets, isLoading, isError, error } = useBudgets();

  if (isLoading) return <GlobalSpinner />;

  if (isError) throw new Error(error?.message);

  const totalSpent = budgets!.reduce((acc, budget) => {
    const spent = budgetTransactionCache.get(budget.budgetId)?.amount ?? 0;

    return acc + spent;
  }, 0);

  return totalSpent === 0 ? null : (
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
  const budgetTransactionCache = useStore(budgetTransactionCacheStore);

  const { budgets, isLoading, isError, error } = useBudgets();

  if (isLoading) return <GlobalSpinner />;

  if (isError) throw new Error(error?.message);

  const budgetsFormatted: Budget[] = [...budgets!]
    .sort((a, b) => {
      const spentA = budgetTransactionCache.get(a.budgetId)?.amount ?? 0;
      const spentB = budgetTransactionCache.get(b.budgetId)?.amount ?? 0;

      const percentA = spentA / a.targetAmount;
      const percentB = spentB / b.targetAmount;

      return percentB - percentA;
    })
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-2">
      {budgetsFormatted.map((budget) => {
        const spentAmount =
          budgetTransactionCache.get(budget.budgetId)?.amount ?? 0;

        return (
          spentAmount > 0 && (
            <div
              key={budget.budgetId}
              className="flex items-center gap-3 rounded-md px-2 py-1.5"
            >
              <div
                className="h-10 w-1 rounded-sm"
                style={{
                  backgroundColor: themeColors.find(
                    (c) => c.name === budget.theme,
                  )?.hex,
                }}
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
                  {spentAmount.toFixed(2)}
                </span>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

export default SummeryBudget;
