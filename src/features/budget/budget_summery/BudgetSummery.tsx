import { useStore } from "@tanstack/react-store";

import { budgetTransactionCacheStore } from "../../../store/appCacheStore.ts";
import { budgetStore, handleBudgetChange } from "../store/budgetStore.ts";

import type { Budget } from "../types/budget.types.ts";

import { themeColors } from "../../../constants/appOptions.ts";

function BudgetSummery() {
  const budgets: Budget[] = [...useStore(budgetStore, (s) => s.budgets)];
  const selectedBudget: string = useStore(budgetStore, (s) => s.selectedBudget);
  const budgetTransactionCache = useStore(budgetTransactionCacheStore);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-2xl font-semibold text-gray-800">Spending Summery</h3>

      <div className="flex flex-col gap-1">
        {budgets.map((budget) => {
          const spentAmount =
            budgetTransactionCache.get(budget.id)?.amount ?? 0;

          return (
            <div
              key={budget.id}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-md px-2 py-1.5"
              style={{
                backgroundColor:
                  budget.id === selectedBudget
                    ? `${themeColors.find((c) => c.name === budget.theme)?.hex}13`
                    : "transparent",
                borderBottom: `1px solid ${themeColors.find((c) => c.name === budget.theme)?.hex}`,
              }}
              onClick={() => handleBudgetChange(budget.id)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-1 rounded-sm"
                  style={{
                    backgroundColor: themeColors.find(
                      (c) => c.name === budget.theme,
                    )?.hex,
                  }}
                ></div>

                <span className="text-lg font-medium text-gray-800">
                  {budget.category
                    .split("_")
                    .map(
                      (part) =>
                        part.charAt(0).toUpperCase() +
                        part.slice(1).toLowerCase(),
                    )
                    .join(" & ")}
                </span>
              </div>

              <div>
                <span
                  className={`font-space-grotesk text-lg font-semibold ${spentAmount >= budget.targetAmount ? "text-error" : "text-text"}`}
                >
                  {budget.currency}
                  {spentAmount}
                </span>
                <span className="text-sm text-gray-500"> of </span>
                <span className="font-space-grotesk text-sm text-gray-500">
                  {budget.currency}
                  {budget.targetAmount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetSummery;
