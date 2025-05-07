import { useQuery } from "@tanstack/react-query";

import { potQueryOptions } from "../../../services/queryOptions.ts";

import type { Pot } from "../types/pot.types.ts";

function useReadPots(): {
  pots: Pot[];
  potsStatus: "pending" | "error" | "success";
  potsFetchStatus: "fetching" | "paused" | "idle";
  potsError: Error | null;
} {
  const {
    data = [],
    status,
    fetchStatus,
    error,
  } = useQuery<Pot[]>({
    ...potQueryOptions,
  });

  return {
    pots: data,
    potsStatus: status,
    potsFetchStatus: fetchStatus,
    potsError: error,
  };
}

export { useReadPots };
