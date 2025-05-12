import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { Route as signinRoute } from "../../../routes/auth/signin.tsx";

import { signUp as signUpApi } from "../../../services/apiAuth.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

function useSignUp() {
  const navigate = useNavigate();

  const { status, error, mutate } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      showToast("success", "Account created successfully. Let’s get started!");

      navigate({ to: signinRoute.to });
    },
    onError() {
      showToast(
        "error",
        "Whoops! Something went wrong while creating your account. Give it another shot and let’s get you back on track!",
      );
    },
  });

  return {
    signUpStatus: status,
    signUpError: error,
    signUp: mutate,
  };
}

export { useSignUp };
