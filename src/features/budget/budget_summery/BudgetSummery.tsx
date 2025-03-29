import type { Budget } from "../types/budget.types.ts";

function BudgetSummery({ budgets }: { budgets: Budget[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-2xl font-semibold text-gray-800">Spending Summery</h3>

      <div className="flex flex-col gap-4">
        {budgets.map((budget) => (
          <div
            key={budget.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-8 w-1 rounded-sm"
                style={{ backgroundColor: budget.theme }}
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
                className={`font-space-grotesk text-lg font-semibold ${budget.spentAmount >= budget.targetAmount ? "text-error" : "text-text"}`}
              >
                {budget.currency}
                {budget.spentAmount}
              </span>
              <span className="text-sm text-gray-500"> of </span>
              <span className="font-space-grotesk text-sm text-gray-500">
                {budget.currency}
                {budget.targetAmount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BudgetSummery;
