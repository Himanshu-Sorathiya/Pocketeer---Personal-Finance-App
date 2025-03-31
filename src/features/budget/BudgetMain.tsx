import { useStore } from "@tanstack/react-store";

import { budgetStore } from "./store/budgetStore.ts";

import BudgetList from "./budget_list/BudgetList.tsx";
import BudgetPieChart from "./budget_pie_chart/BudgetPieChart.tsx";
import BudgetPlaceholder from "./budget_placeholder/BudgetPlaceholder.tsx";
import BudgetSummery from "./budget_summery/BudgetSummery.tsx";

import type { Budget } from "./types/budget.types.ts";

function BudgetMain() {
  const budgets: Budget[] = useStore(budgetStore, (s) => s.budgets);

  const shouldShowPlaceholder = budgets.length === 0;

  return shouldShowPlaceholder ? (
    <BudgetPlaceholder />
  ) : (
    <div className="flex items-start justify-between gap-10 whitespace-nowrap">
      <div className="bg-shade-100 flex basis-5/12 flex-col gap-3 rounded-md px-6 py-4 pt-0">
        <BudgetPieChart />

        <BudgetSummery />
      </div>

      <BudgetList />
    </div>
  );
}

export default BudgetMain;
