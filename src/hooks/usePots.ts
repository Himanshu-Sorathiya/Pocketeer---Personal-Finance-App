import { useQuery } from "@tanstack/react-query";

import {
  potQueryOptions,
  transactionQueryOptions,
} from "../services/queryOptions.ts";

function usePots() {
  const {
    status: transactionsStatus,
    fetchStatus: transactionsFetchStatus,
    error: transactionError,
  } = useQuery({
    ...transactionQueryOptions,
  });

  const {
    data: pots,
    status: potsStatus,
    fetchStatus: potsFetchStatus,
    error: potError,
  } = useQuery({
    ...potQueryOptions,
    enabled:
      transactionsStatus === "success" && transactionsFetchStatus === "idle",
  });

  const isLoading =
    transactionsStatus === "pending" ||
    potsStatus === "pending" ||
    transactionsFetchStatus === "paused" ||
    potsFetchStatus === "paused";

  const isError = transactionsStatus === "error" || potsStatus === "error";

  return {
    pots,
    isLoading,
    isError,
    error: transactionError || potError,
  };
}

export { usePots };
