import { supabase } from "./supabase.ts";

import type { Budget } from "../features/budget/types/budget.types.ts";

import type { TransactionCategory } from "../constants/transactionConfig.ts";

async function getBudgets(user_id: string): Promise<Budget[]> {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw error;

  return data.map((item) => ({
    user_id: item.user_id,
    budgetId: item.budget_id,
    category: item.category as TransactionCategory,
    targetAmount: item.target_amount,
    currency: item.currency,
    theme: item.theme,
    creationDate: item.creation_date,
  }));
}

export { getBudgets };
