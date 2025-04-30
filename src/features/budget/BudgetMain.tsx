import { useStore } from "@tanstack/react-store";

import { budgetStore } from "./store/budgetStore.ts";

import { useReadBudgets } from "./hooks/useReadBudgets.ts";

import BudgetList from "./budget_list/BudgetList.tsx";
import BudgetPieChart from "./budget_pie_chart/BudgetPieChart.tsx";
import BudgetPlaceholder from "./budget_placeholder/BudgetPlaceholder.tsx";
import BudgetSummery from "./budget_summery/BudgetSummery.tsx";

import type { Budget } from "./types/budget.types.ts";

function BudgetMain() {
  const { budgets } = useReadBudgets();

  const selectedBudgetId =
    useStore(budgetStore, (s) => s.selectedBudgetId) || budgets![0].budgetId;

  const budget: Budget =
    budgets.find((budget) => budget.budgetId === selectedBudgetId) ||
    budgets[0];

  const shouldShowPlaceholder = budgets.length === 0;

  return shouldShowPlaceholder ? (
    <BudgetPlaceholder />
  ) : (
    <div className="grid grid-cols-[5fr_7fr] items-start gap-10 whitespace-nowrap">
      <div className="bg-shade-100 flex flex-col gap-3 rounded-md px-6 pb-4">
        <BudgetPieChart />

        <BudgetSummery selectedBudgetId={selectedBudgetId} />
      </div>

      <BudgetList budget={budget} selectedBudgetId={selectedBudgetId} />
    </div>
  );
}

export default BudgetMain;
