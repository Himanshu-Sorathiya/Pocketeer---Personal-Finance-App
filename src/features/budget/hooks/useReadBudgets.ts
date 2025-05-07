import { useQuery } from "@tanstack/react-query";

import { budgetQueryOptions } from "../../../services/queryOptions.ts";

import type { Budget } from "../types/budget.types.ts";

function useReadBudgets(): {
  budgets: Budget[];
  budgetsStatus: "pending" | "error" | "success";
  budgetsFetchStatus: "fetching" | "paused" | "idle";
  budgetsError: Error | null;
} {
  const {
    data = [],
    status,
    fetchStatus,
    error,
  } = useQuery<Budget[]>({
    ...budgetQueryOptions,
  });

  return {
    budgets: data,
    budgetsStatus: status,
    budgetsFetchStatus: fetchStatus,
    budgetsError: error,
  };
}

export { useReadBudgets };
