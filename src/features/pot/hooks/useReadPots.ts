import {
  type QueryObserverResult,
  type RefetchOptions,
  useQuery,
} from "@tanstack/react-query";

import { potQueryOptions } from "../../../services/queryOptions.ts";

import type { Pot } from "../types/pot.types.ts";

function useReadPots(): {
  pots: Pot[];
  potsStatus: "pending" | "error" | "success";
  potsFetchStatus: "fetching" | "paused" | "idle";
  potsError: Error | null;
  refetchPots: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<Pot[], Error>>;
} {
  const {
    data: pots = [],
    status: potsStatus,
    fetchStatus: potsFetchStatus,
    error: potsError,
    refetch: refetchPots,
  } = useQuery({
    ...potQueryOptions,
  });

  return {
    pots,
    potsStatus,
    potsFetchStatus,
    potsError,
    refetchPots,
  };
}

export { useReadPots };
