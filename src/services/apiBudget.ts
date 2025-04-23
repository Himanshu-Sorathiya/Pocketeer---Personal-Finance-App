import type { QueryKey } from "@tanstack/react-query";

import { supabase } from "./supabase.ts";

import type { Budget } from "../features/budget/types/budget.types.ts";

import type { TransactionCategory } from "../constants/transactionConfig.ts";

async function getBudgets({
  queryKey,
}: {
  queryKey: QueryKey;
}): Promise<Budget[]> {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", queryKey[1]);

  if (error) {
    throw new Error(
      "Oops! We couldn’t fetch your budgets right now. But don’t worry—Pocketeer will sort it out soon!",
    );
  }

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
