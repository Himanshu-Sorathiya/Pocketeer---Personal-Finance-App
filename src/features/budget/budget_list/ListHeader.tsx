import { useBudgets } from "../../../hooks/useBudgets.ts";

import { ListActions } from "./ListElements.tsx";

import GlobalSpinner from "../../../components/loaders/GlobalSpinner.tsx";

import type { Budget } from "../types/budget.types.ts";

import { themeColors } from "../../../constants/appOptions.ts";

function ListHeader({ selectedBudgetId }: { selectedBudgetId: string }) {
  const { budgets, isLoading, isError, error } = useBudgets();

  if (isLoading) return <GlobalSpinner />;

  if (isError) throw new Error(error?.message);

  const budget: Budget =
    budgets!.find((b) => b.budgetId === selectedBudgetId) || budgets![0];

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div
          className="size-4 rounded-full"
          style={{
            backgroundColor: themeColors.find((c) => c.name === budget.theme)
              ?.hex,
          }}
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

      <ListActions selectedBudgetId={selectedBudgetId} />
    </div>
  );
}

export default ListHeader;
