import { useStore } from "@tanstack/react-store";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { budgetTransactionCacheStore } from "../../../store/appCacheStore.ts";

import { useUser } from "../../auth/hooks/useUser.ts";
import { useReadBudgets } from "../hooks/useReadBudgets.ts";

import type { Budget } from "../types/budget.types.ts";

import { themeColors } from "../../../constants/appOptions.ts";

function BudgetPieChart() {
  const { currency_symbol } = useUser();
  const { budgets } = useReadBudgets();

  const budgetTransactionCache = useStore(budgetTransactionCacheStore);

  const budgetsWithSpent: (Budget & { spentAmount: number })[] = budgets.map(
    (budget) => ({
      ...budget,
      spentAmount: budgetTransactionCache.get(budget.budgetId)?.amount ?? 0,
    }),
  );

  const totalSpent = budgetsWithSpent
    .reduce((sum, budget) => sum + budget.spentAmount, 0)
    .toFixed(2);
  const totalBudget = budgetsWithSpent
    .reduce((sum, budget) => sum + budget.targetAmount, 0)
    .toFixed(2);

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={budgetsWithSpent}
            innerRadius={80}
            outerRadius={105}
            fill="#e0e0e0"
            paddingAngle={1}
            dataKey="spentAmount"
          >
            {budgetsWithSpent.map((budget) => (
              <Cell
                key={budget.budgetId}
                fill={themeColors.find((c) => c.name === budget.theme)?.hex}
              />
            ))}
          </Pie>

          <Tooltip
            content={({ active, payload, coordinate }: any) => {
              if (!active || !payload || payload.length === 0 || !coordinate)
                return null;

              const budget = payload[0]?.payload;
              if (!budget) return null;

              return (
                <div
                  className="bg-shade-100 z-10 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium whitespace-nowrap opacity-100 shadow-md"
                  style={{
                    left: coordinate.x,
                    top: coordinate.y,
                    transform: "translate(-50%, -115%)",
                    position: "absolute",
                  }}
                >
                  <p
                    style={{
                      color: themeColors.find((c) => c.name === budget.theme)
                        ?.hex,
                    }}
                  >
                    Budget:{" "}
                    <span>
                      {budget.category
                        .split("_")
                        .map(
                          (part: string) =>
                            part.charAt(0).toUpperCase() +
                            part.slice(1).toLowerCase(),
                        )
                        .join(" & ")}
                    </span>
                  </p>

                  <p style={{ color: "#364153" }}>
                    Total:{" "}
                    <span className="font-space-grotesk">
                      {budget.currency}
                      {budget.targetAmount.toFixed(2)}
                    </span>
                  </p>

                  <p
                    style={{
                      color:
                        budget.spentAmount >= budget.targetAmount
                          ? "#d90429"
                          : themeColors.find((c) => c.name === budget.theme)
                              ?.hex,
                    }}
                    className="mt-2"
                  >
                    Spent:{" "}
                    <span className="font-space-grotesk">
                      {budget.currency}
                      {payload[0]?.value.toFixed(2)}
                    </span>
                  </p>

                  <p style={{ color: "#364153" }}>
                    Remaining:{" "}
                    <span className="font-space-grotesk">
                      {budget.currency}
                      {(budget.targetAmount - budget.spentAmount || 0).toFixed(
                        2,
                      )}
                    </span>
                  </p>
                </div>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
        <p
          className={`font-space-grotesk text-3xl font-semibold ${totalSpent >= totalBudget ? "text-error" : "text-text"}`}
        >
          {currency_symbol}
          {totalSpent}
        </p>

        <p className="text-sm font-semibold text-gray-500">
          of {currency_symbol}
          {totalBudget}
        </p>
      </div>
    </div>
  );
}

export default BudgetPieChart;
