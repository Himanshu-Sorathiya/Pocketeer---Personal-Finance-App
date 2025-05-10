import { useQuery } from "@tanstack/react-query";

import { getTransactions as getTransactionsApi } from "../../../services/apiTransaction.ts";

import { useUser } from "../../auth/hooks/useUser.ts";

import type { Transaction } from "../types/transaction.types.ts";

function useReadTransactions(): {
  transactions: Transaction[];
  transactionsStatus: "pending" | "error" | "success";
  transactionsFetchStatus: "fetching" | "paused" | "idle";
  transactionsError: Error | null;
} {
  const { user_id } = useUser();

  const {
    data = [],
    status,
    fetchStatus,
    error,
  } = useQuery<Transaction[]>({
    queryKey: ["transactions", user_id],
    queryFn: getTransactionsApi,
  });

  return {
    transactions: data,
    transactionsStatus: status,
    transactionsFetchStatus: fetchStatus,
    transactionsError: error,
  };
}

export { useReadTransactions };
