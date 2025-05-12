import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { Route as indexRoute } from "../../../routes/index.tsx";

import { signIn as signInApi } from "../../../services/apiAuth.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

function useSignIn() {
  const navigate = useNavigate();

  const { status, error, mutate } = useMutation({
    mutationFn: signInApi,
    onSuccess: () => {
      showToast("success", "Welcome back! You’re successfully signed in.");

      navigate({ to: indexRoute.to, replace: true });
    },
    onError: () => {
      showToast(
        "error",
        "Whoops! It looks like those credentials don't quite match. Give it another shot and let’s get you back on track!",
      );
    },
  });

  return {
    signInStatus: status,
    signInError: error,
    signIn: mutate,
  };
}

export { useSignIn };
