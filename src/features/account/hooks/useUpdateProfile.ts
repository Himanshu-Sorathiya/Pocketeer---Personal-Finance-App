import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateProfile as updateProfileApi } from "../../../services/apiAccount.ts";

import { handleCloseModal } from "../../../store/appModalStore.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

function useUpdateProfile(): {
  updateProfileStatus: "error" | "idle" | "pending" | "success";
  updateProfileError: Error | null;
  updateProfile: UseMutateFunction<
    any,
    Error,
    {
      user_id: string;
      conversionFactor: number;
      updates: {
        currency_code: string;
        currency_symbol: string;
        currency_emoji: string;
      };
    },
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const { status, error, mutate } = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      showToast("success", "Your profile has been successfully updated.");

      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError: () => {
      showToast("error", "Failed to update the profile. Please try again.");
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  return {
    updateProfileStatus: status,
    updateProfileError: error,
    updateProfile: mutate,
  };
}

export { useUpdateProfile };
