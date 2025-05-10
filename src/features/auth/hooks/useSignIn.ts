import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { Route as indexRoute } from "../../../routes/index.tsx";

import { signIn as signInApi } from "../../../services/apiAuth.ts";

function useSignIn() {
  const navigate = useNavigate();

  const { status, error, mutate } = useMutation({
    mutationFn: signInApi,
    onSuccess: () => {
      navigate({ to: indexRoute.to, replace: true });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return {
    signInStatus: status,
    signInError: error,
    signIn: mutate,
  };
}

export { useSignIn };
