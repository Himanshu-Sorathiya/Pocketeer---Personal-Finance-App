import { useQuery } from "@tanstack/react-query";

import { transactionQueryOptions } from "../services/queryOptions.ts";

function useTransactions() {
  const {
    data: transactions,
    status: transactionsStatus,
    fetchStatus: transactionsFetchStatus,
    error: transactionError,
  } = useQuery({
    ...transactionQueryOptions,
  });

  const isLoading =
    transactionsStatus === "pending" || transactionsFetchStatus === "paused";

  const isError = transactionsStatus === "error";

  return {
    transactions,
    isLoading,
    isError,
    error: transactionError,
  };
}

export { useTransactions };
