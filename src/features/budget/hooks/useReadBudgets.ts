import { useQuery } from "@tanstack/react-query";

import { budgetQueryOptions } from "../../../services/queryOptions.ts";

import { useReadTransactions } from "../../transaction/hooks/useReadTransactions.ts";

import type { Budget } from "../types/budget.types.ts";

function useReadBudgets(): {
  budgets: Budget[];
  budgetsStatus: string;
  budgetsFetchStatus: string;
  budgetsError: Error | null;
} {
  const { transactionsStatus, transactionsFetchStatus } = useReadTransactions();

  const {
    data: budgets = [],
    status: budgetsStatus,
    fetchStatus: budgetsFetchStatus,
    error: budgetsError,
  } = useQuery({
    ...budgetQueryOptions,
    enabled:
      transactionsStatus === "success" && transactionsFetchStatus === "idle",
  });

  return {
    budgets,
    budgetsFetchStatus,
    budgetsError,
    budgetsStatus,
  };
}

export { useReadBudgets };
