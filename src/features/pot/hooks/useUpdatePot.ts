import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updatePot as updatePotApi } from "../../../services/apiPot.ts";

import { handleCloseModal } from "../../../store/appModalStore.ts";

import type { Pot } from "../types/pot.types.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

function useUpdatePot(): {
  updatedPot: Pot | undefined;
  potStatus: "error" | "idle" | "pending" | "success";
  potError: Error | null;
  updatePot: UseMutateFunction<
    Pot,
    Error,
    {
      potId: string;
      updates: Partial<Pick<Pot, "name" | "targetAmount" | "theme">>;
      transactionIds: string[];
    },
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationFn: updatePotApi,
    onSuccess: () => {
      showToast(
        "success",
        "Pot updated successfully. Keep your savings on point!",
      );

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError() {
      showToast(
        "error",
        "Whoops! Something went wrong while updating the pot. Give it another shot and let’s get you back on track!",
      );
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  return {
    updatedPot: data,
    potStatus: status,
    potError: error,
    updatePot: mutate,
  };
}

export { useUpdatePot };
