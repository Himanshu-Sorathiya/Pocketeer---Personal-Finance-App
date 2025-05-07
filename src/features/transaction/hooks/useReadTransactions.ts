import { useQuery } from "@tanstack/react-query";

import { transactionQueryOptions } from "../../../services/queryOptions.ts";

import type { Transaction } from "../types/transaction.types.ts";

function useReadTransactions(): {
  transactions: Transaction[];
  transactionsStatus: "pending" | "error" | "success";
  transactionsFetchStatus: "fetching" | "paused" | "idle";
  transactionsError: Error | null;
} {
  const {
    data = [],
    status,
    fetchStatus,
    error,
  } = useQuery<Transaction[]>({
    ...transactionQueryOptions,
  });

  return {
    transactions: data,
    transactionsStatus: status,
    transactionsFetchStatus: fetchStatus,
    transactionsError: error,
  };
}

export { useReadTransactions };
