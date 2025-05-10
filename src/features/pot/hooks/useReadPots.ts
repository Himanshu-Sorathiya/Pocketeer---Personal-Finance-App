import { useQuery } from "@tanstack/react-query";

import { getPots as getPotsApi } from "../../../services/apiPot.ts";

import { useUser } from "../../auth/hooks/useUser.ts";

import type { Pot } from "../types/pot.types.ts";

function useReadPots(): {
  pots: Pot[];
  potsStatus: "pending" | "error" | "success";
  potsFetchStatus: "fetching" | "paused" | "idle";
  potsError: Error | null;
} {
  const { user_id } = useUser();

  const {
    data = [],
    status,
    fetchStatus,
    error,
  } = useQuery<Pot[]>({
    queryKey: ["pots", user_id],
    queryFn: getPotsApi,
  });

  return {
    pots: data,
    potsStatus: status,
    potsFetchStatus: fetchStatus,
    potsError: error,
  };
}

export { useReadPots };
