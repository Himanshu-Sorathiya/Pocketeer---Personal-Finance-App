import { useQuery } from "@tanstack/react-query";

import { getBudgets as getBudgetsApi } from "../../../services/apiBudget.ts";

import { useUser } from "../../auth/hooks/useUser.ts";

import type { Budget } from "../types/budget.types.ts";

function useReadBudgets(): {
  budgets: Budget[];
  budgetsStatus: "pending" | "error" | "success";
  budgetsFetchStatus: "fetching" | "paused" | "idle";
  budgetsError: Error | null;
} {
  const { user_id } = useUser();

  const {
    data = [],
    status,
    fetchStatus,
    error,
  } = useQuery<Budget[]>({
    queryKey: ["budgets", user_id],
    queryFn: getBudgetsApi,
  });

  return {
    budgets: data,
    budgetsStatus: status,
    budgetsFetchStatus: fetchStatus,
    budgetsError: error,
  };
}

export { useReadBudgets };
