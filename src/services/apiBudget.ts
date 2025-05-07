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
    .eq("user_id", queryKey[1])
    .order("creation_date", { ascending: false })
    .order("creation_time", { ascending: false });

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

async function createBudget(
  budget: Omit<
    Budget,
    "user_id" | "budgetId" | "currency" | "creationDate" | "creationTime"
  >,
): Promise<Budget> {
  const { data, error } = await supabase
    .from("budgets")
    .insert([
      {
        user_id,
        category: budget.category,
        target_amount: budget.targetAmount,
        currency,
        theme: budget.theme,
        creation_date: new Date().toISOString().split("T")[0],
        creation_time: new Date().toTimeString().slice(0, 8),
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(
      "Oops! We couldn’t create your budget right now. But don’t worry—Pocketeer will sort it out soon!",
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

async function updateBudget({
  budgetId,
  updates,
}: {
  budgetId: string;
  updates: Partial<Pick<Budget, "category" | "targetAmount" | "theme">>;
}): Promise<Budget> {
  const { data, error } = await supabase
    .from("budgets")
    .update({
      ...("category" in updates && { category: updates.category }),
      ...("targetAmount" in updates && { target_amount: updates.targetAmount }),
      ...("theme" in updates && { theme: updates.theme }),
      ...{ creation_time: "00:00:00" },
    })
    .eq("budget_id", budgetId)
    .select()
    .single();

  if (error) {
    throw new Error(
      "Oops! We couldn’t update your budget right now. But don’t worry—Pocketeer will sort it out soon!",
    );
  }

  return {
    user_id: data.user_id,
    budgetId: data.budget_id,
    category: data.category,
    targetAmount: data.target_amount,
    currency: data.currency,
    theme: data.theme,
    creationDate: data.creation_date,
    creationTime: data.creation_time,
  };
}

async function deleteBudget({ budgetId }: { budgetId: string }) {
  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("budget_id", budgetId);

  if (error) {
    throw new Error(
      "Oops! We couldn’t delete your budget right now. But don’t worry—Pocketeer will sort it out soon!",
    );
  }
}

export { createBudget, deleteBudget, getBudgets, updateBudget };
