import { useStore } from "@tanstack/react-store";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { transactionStore } from "../../transaction/store/transactionStore.ts";
import { budgetStore } from "../store/budgetStore.ts";

import type { Transaction } from "../../transaction/types/transaction.types.ts";
import type { Budget } from "../types/budget.types.ts";

import { filterTransactionsByBudget } from "../budget_helpers/BudgetHelpers.ts";

function BudgetPieChart() {
  const transactions: Transaction[] = [
    ...useStore(transactionStore, (s) => s.transactions),
  ];
  const budgets: (Budget & { spentAmount: number })[] = [
    ...useStore(budgetStore, (s) => s.budgets),
  ].map((budget) => ({
    ...budget,
    spentAmount: filterTransactionsByBudget(
      budget.creationDate,
      budget.category,
      transactions,
    ).reduce((sum, t) => sum + t.amount, 0),
  }));

  const totalSpent = budgets.reduce(
    (sum, budget) => sum + budget.spentAmount,
    0,
  );
  const totalBudget = budgets.reduce(
    (sum, budget) => sum + budget.targetAmount,
    0,
  );

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={budgets}
            innerRadius={80}
            outerRadius={105}
            fill="#e0e0e0"
            paddingAngle={1}
            dataKey="spentAmount"
          >
            {budgets.map((budget) => (
              <Cell key={budget.id} fill={budget.theme} />
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
                  <p style={{ color: "#364153" }}>
                    Total:{" "}
                    <span className="font-space-grotesk">
                      {budget.targetAmount}
                      {budget.currency}
                    </span>
                  </p>

                  <p
                    style={{
                      color:
                        budget.spentAmount >= budget.targetAmount
                          ? "#d90429"
                          : budget.theme,
                    }}
                    className="mt-2"
                  >
                    Spent:{" "}
                    <span className="font-space-grotesk">
                      {payload[0]?.value}
                      {budget.currency}
                    </span>
                  </p>

                  <p style={{ color: "#364153" }}>
                    Remaining:{" "}
                    <span className="font-space-grotesk">
                      {budget.targetAmount - budget.spentAmount || 0}
                      {budget.currency}
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
          className={`font-space-grotesk text-4xl font-semibold ${totalSpent >= totalBudget ? "text-error" : "text-text"}`}
        >
          {budgets[0].currency}
          {totalSpent}
        </p>

        <p className="text-sm font-semibold text-gray-500">
          of {budgets[0].currency}
          {totalBudget}
        </p>
      </div>
    </div>
  );
}

export default BudgetPieChart;
