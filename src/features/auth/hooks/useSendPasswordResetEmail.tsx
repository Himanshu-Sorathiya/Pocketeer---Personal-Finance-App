import { useMutation } from "@tanstack/react-query";

import { sendPasswordResetEmail as sendPasswordResetEmailApi } from "../../../services/apiAuth.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

function useSendPasswordResetEmail() {
  const { status, error, mutate } = useMutation({
    mutationFn: sendPasswordResetEmailApi,
    onSuccess: () => {
      showToast(
        "success",
        "Password reset email sent! Check your inbox to proceed.",
      );
    },
    onError: () => {
      showToast(
        "error",
        "Unable to send password reset email. Please try again.",
      );
    },
  });

  return {
    sendPasswordResetEmailStatus: status,
    sendPasswordResetEmailError: error,
    sendPasswordResetEmail: mutate,
  };
}

export { useSendPasswordResetEmail };
