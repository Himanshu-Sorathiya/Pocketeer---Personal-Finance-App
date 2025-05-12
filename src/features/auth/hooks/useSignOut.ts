import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { Route as signInRoute } from "../../../routes/auth/signin.tsx";

import { signOut as signOutApi } from "../../../services/apiAuth.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

function useSignOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { status, error, mutate } = useMutation({
    mutationFn: signOutApi,
    onSuccess: () => {
      showToast("success", "You’re signed out. See you again soon!");

      queryClient.removeQueries();

      navigate({ to: signInRoute.to, replace: true });
    },
    onError: () => {
      showToast(
        "error",
        "Whoops! Something went wrong while signing out. Give it another shot and let’s get you back on track!",
      );
    },
  });

  return {
    signOutStatus: status,
    signOutError: error,
    signOut: mutate,
  };
}

export { useSignOut };
