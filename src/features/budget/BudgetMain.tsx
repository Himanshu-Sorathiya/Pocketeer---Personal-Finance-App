import { useState } from "react";

import BudgetList from "./budget_list/BudgetList.tsx";
import { getBudgets } from "./data/budget_data.ts";

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
  const unbudgeted = new Set<TransactionCategory>();

  for (const t of transactions) {
    if (foundCategories.size === totalCategories) break;
    if (!foundCategories.has(t.category)) {
      unbudgeted.add(t.category);
      foundCategories.add(t.category);
    }
  }

  return (
    <div className="flex items-start justify-between gap-10 whitespace-nowrap">
      <div className="basis-5/12 bg-green-200">Pie Chart</div>

      <BudgetList budgets={budgets} />
    </div>
  );
}

export default BudgetMain;
