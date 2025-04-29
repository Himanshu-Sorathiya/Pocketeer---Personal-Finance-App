import {
  type QueryObserverResult,
  type RefetchOptions,
  useQuery,
} from "@tanstack/react-query";

import { budgetQueryOptions } from "../../../services/queryOptions.ts";

import type { Budget } from "../types/budget.types.ts";

function useReadBudgets(): {
  budgets: Budget[];
  budgetsStatus: "pending" | "error" | "success";
  budgetsFetchStatus: "fetching" | "paused" | "idle";
  budgetsError: Error | null;
  refetchBudgets: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<Budget[], Error>>;
} {
  const {
    data: budgets = [],
    status: budgetsStatus,
    fetchStatus: budgetsFetchStatus,
    error: budgetsError,
    refetch: refetchBudgets,
  } = useQuery({
    ...budgetQueryOptions,
  });

  return {
    budgets,
    budgetsStatus,
    budgetsFetchStatus,
    budgetsError,
    refetchBudgets,
  };
}

export { useReadBudgets };
