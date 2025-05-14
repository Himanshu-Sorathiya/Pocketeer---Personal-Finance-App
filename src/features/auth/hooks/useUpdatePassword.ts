import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { Route as signInRoute } from "../../../routes/auth/signin.tsx";

import { updatePassword as updatePasswordApi } from "../../../services/apiAuth.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

function useUpdatePassword() {
  const navigate = useNavigate();

  const { status, error, mutate } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      showToast("success", "Your password has been successfully updated.");

      navigate({ to: signInRoute.to, replace: true });
    },
    onError: () => {
      showToast("error", "Failed to update the password. Please try again.");
    },
  });

  return {
    updatePasswordStatus: status,
    updatePasswordError: error,
    updatePassword: mutate,
  };
}

export { useUpdatePassword };
