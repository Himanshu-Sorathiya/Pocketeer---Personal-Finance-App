import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

import { getUser as getUserApi } from "../../../services/apiAuth.ts";

function useUser(): {
  user: User | null;
  userStatus: "pending" | "error" | "success";
  userFetchStatus: "fetching" | "paused" | "idle";
  userError: Error | null;
  isAuthenticated: boolean;
  user_id: string | undefined;
  currency_code: string | undefined;
  currency_symbol: string | undefined;
  currency_emoji: string | undefined;
} {
  const {
    data = null,
    status,
    fetchStatus,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
  });

  return {
    user: data,
    userStatus: status,
    userFetchStatus: fetchStatus,
    userError: error,
    isAuthenticated: status === "success" && data?.role === "authenticated",
    user_id: data?.id,
    currency_code: data?.user_metadata?.currency_code,
    currency_symbol: data?.user_metadata?.currency_symbol,
    currency_emoji: data?.user_metadata?.currency_emoji,
  };
}

export { useUser };
