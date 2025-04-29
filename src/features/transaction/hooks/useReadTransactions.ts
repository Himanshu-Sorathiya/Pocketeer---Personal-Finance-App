import {
  type QueryObserverResult,
  type RefetchOptions,
  useQuery,
} from "@tanstack/react-query";

import { transactionQueryOptions } from "../../../services/queryOptions.ts";

import type { Transaction } from "../types/transaction.types.ts";

function useReadTransactions(): {
  transactions: Transaction[];
  transactionsStatus: "pending" | "error" | "success";
  transactionsFetchStatus: "fetching" | "paused" | "idle";
  transactionsError: Error | null;
  refetchTransactions: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<Transaction[], Error>>;
} {
  const {
    data: transactions = [],
    status: transactionsStatus,
    fetchStatus: transactionsFetchStatus,
    error: transactionsError,
    refetch: refetchTransactions,
  } = useQuery({ ...transactionQueryOptions });

  return {
    transactions,
    transactionsStatus,
    transactionsFetchStatus,
    transactionsError,
    refetchTransactions,
  };
}

export { useReadTransactions };
