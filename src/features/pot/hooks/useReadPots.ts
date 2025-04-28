import { useQuery } from "@tanstack/react-query";

import { potQueryOptions } from "../../../services/queryOptions.ts";

import { useReadTransactions } from "../../transaction/hooks/useReadTransactions.ts";

import type { Pot } from "../types/pot.types.ts";

function useReadPots(): {
  pots: Pot[];
  potsStatus: string;
  potsFetchStatus: string;
  potsError: Error | null;
} {
  const { transactionsStatus, transactionsFetchStatus } = useReadTransactions();

  const {
    data: pots = [],
    status: potsStatus,
    fetchStatus: potsFetchStatus,
    error: potsError,
  } = useQuery({
    ...potQueryOptions,
    enabled:
      transactionsStatus === "success" && transactionsFetchStatus === "idle",
  });

  return {
    pots,
    potsFetchStatus,
    potsError,
    potsStatus,
  };
}

export { useReadPots };
