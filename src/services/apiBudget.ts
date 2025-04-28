import type { QueryKey } from "@tanstack/react-query";

import { currency, user_id } from "../constants/user.ts";

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

  const budgets: Budget[] = data.map((item) => ({
    user_id: item.user_id,
    budgetId: item.budget_id,
    category: item.category as TransactionCategory,
    targetAmount: item.target_amount,
    currency: item.currency,
    theme: item.theme,
    creationDate: item.creation_date,
    creationTime: item.creation_time,
  }));

  return budgets;
}

async function addBudget({
  budget,
}: {
  budget: Omit<Budget, "budgetId" | "currency" | "user_id" | "creationTime">;
}): Promise<Budget> {
  const { data, error } = await supabase
    .from("budgets")
    .insert([
      {
        user_id,
        category: budget.category,
        target_amount: budget.targetAmount,
        currency,
        theme: budget.theme,
        creation_date: budget.creationDate,
        creation_time: new Date().toTimeString().slice(0, 8),
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(
      "Oops! We couldn’t add your budget right now. But don’t worry—Pocketeer will sort it out soon!",
    );
  }

  return {
    user_id: data.user_id,
    budgetId: data.budget_id,
    category: data.category as TransactionCategory,
    targetAmount: data.target_amount,
    currency: data.currency,
    theme: data.theme,
    creationDate: data.creation_date,
    creationTime: data.creation_time,
  };
}

export { addBudget, getBudgets };
