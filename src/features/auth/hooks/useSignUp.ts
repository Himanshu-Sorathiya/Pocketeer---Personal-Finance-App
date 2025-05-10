import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { Route as signinRoute } from "../../../routes/auth/signin.tsx";

import { signUp as signUpApi } from "../../../services/apiAuth.ts";

function useSignUp() {
  const navigate = useNavigate();

  const { status, error, mutate } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      navigate({ to: signinRoute.to });
    },
    onError(error) {
      throw new Error(error.message);
    },
  });

  return {
    signUpStatus: status,
    signUpError: error,
    signUp: mutate,
  };
}

export { useSignUp };
