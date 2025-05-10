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
    isAuthenticated: data?.role === "authenticated",
    user_id: data?.id,
  };
}

export { useUser };
