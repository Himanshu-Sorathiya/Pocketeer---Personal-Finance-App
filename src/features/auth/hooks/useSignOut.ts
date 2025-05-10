import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { Route as signInRoute } from "../../../routes/auth/signin.tsx";

import { signOut as signOutApi } from "../../../services/apiAuth.ts";

function useSignOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { status, error, mutate } = useMutation({
    mutationFn: signOutApi,
    onSuccess: () => {
      queryClient.removeQueries();

      navigate({ to: signInRoute.to, replace: true });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return {
    signOutStatus: status,
    signOutError: error,
    signOut: mutate,
  };
}

export { useSignOut };
