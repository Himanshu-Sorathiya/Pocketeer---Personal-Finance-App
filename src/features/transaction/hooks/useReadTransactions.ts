import { useQuery } from "@tanstack/react-query";

import { transactionQueryOptions } from "../../../services/queryOptions.ts";

import type { Transaction } from "../types/transaction.types.ts";

function useReadTransactions(): {
  transactions: Transaction[];
  transactionsStatus: string;
  transactionsFetchStatus: string;
  transactionsError: Error | null;
} {
  const {
    data: transactions = [],
    status: transactionsStatus,
    fetchStatus: transactionsFetchStatus,
    error: transactionsError,
  } = useQuery({ ...transactionQueryOptions });

  return {
    transactions,
    transactionsFetchStatus,
    transactionsError,
    transactionsStatus,
  };
}

export { useReadTransactions };
