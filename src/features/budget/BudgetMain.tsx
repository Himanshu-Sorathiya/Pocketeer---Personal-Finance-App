import { useState } from "react";

import BudgetList from "./budget_list/BudgetList.tsx";
import BudgetPieChart from "./budget_pie_chart/BudgetPieChart.tsx";
import BudgetPlaceholder from "./budget_placeholder/BudgetPlaceholder.tsx";
import BudgetSummery from "./budget_summery/BudgetSummery.tsx";
import { getBudgets } from "./data/budget_data.ts";
import UnbudgetedList from "./unbudgeted_list/UnbudgetedList.tsx";

import { getTransactions } from "../transaction/data/transaction_data.ts";

import type { TransactionCategory } from "../transaction/types/transaction.types.ts";
import type { Budget } from "./types/budget.types.ts";

import transactionCategories from "../../constants/transactionCategory.ts";

function BudgetMain() {
  const [budgets] = useState<Budget[]>(getBudgets());

  const categorizedBudgets = new Set(budgets.map((b) => b.category));
  const totalCategories = transactionCategories.length;

  const transactions = getTransactions();
  const foundCategories = new Set(categorizedBudgets);
  const unbudgeted: TransactionCategory[] = [];

  for (const t of transactions) {
    if (foundCategories.size === totalCategories) break;
    if (!foundCategories.has(t.category)) {
      unbudgeted.push(t.category);
      foundCategories.add(t.category);
    }
  }

  const shouldShowPlaceholder = budgets.length === 0;

  return shouldShowPlaceholder ? (
    <div className="flex flex-col gap-6">
      <BudgetPlaceholder />

      <UnbudgetedList categories={unbudgeted} />
    </div>
  ) : (
    <div className="flex items-start justify-between gap-10 whitespace-nowrap">
      <div className="bg-shade-100 flex basis-5/12 flex-col gap-3 rounded-md px-6 py-4 pt-0">
        <BudgetPieChart budgets={budgets} />

        <BudgetSummery budgets={budgets} />
      </div>

      <div className="flex basis-7/12 flex-col gap-10">
        <BudgetList budgets={budgets} />

        <UnbudgetedList categories={unbudgeted} />
      </div>
    </div>
  );
}

export default BudgetMain;
