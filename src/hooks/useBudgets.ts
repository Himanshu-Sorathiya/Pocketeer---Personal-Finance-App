import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  budgetQueryOptions,
  transactionQueryOptions,
} from "../services/queryOptions.ts";

function useBudgets() {
  const {
    status: transactionsStatus,
    fetchStatus: transactionsFetchStatus,
    error: transactionError,
  } = useQuery({
    ...transactionQueryOptions,
  });

  const {
    data: budgets,
    status: budgetsStatus,
    fetchStatus: budgetsFetchStatus,
    error: budgetError,
  } = useQuery({
    ...budgetQueryOptions,
    enabled:
      transactionsStatus === "success" && transactionsFetchStatus === "idle",
  });

  const [selectedBudgetId, setSelectedBudgetId] = useState<string>(
    budgets?.[0]?.budgetId ?? "",
  );

  const isLoading =
    transactionsStatus === "pending" ||
    budgetsStatus === "pending" ||
    transactionsFetchStatus === "paused" ||
    budgetsFetchStatus === "paused";

  const isError = transactionsStatus === "error" || budgetsStatus === "error";

  return {
    budgets,
    isLoading,
    isError,
    error: transactionError || budgetError,
    selectedBudgetId,
    setSelectedBudgetId,
  };
}

export { useBudgets };
