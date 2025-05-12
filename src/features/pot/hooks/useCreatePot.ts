import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createPot as createPotApi } from "../../../services/apiPot.ts";

import { handleCloseModal } from "../../../store/appModalStore.ts";

import type { Pot } from "../types/pot.types.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

function useCreatePot(): {
  createdPot: Pot | undefined;
  potStatus: "error" | "idle" | "pending" | "success";
  potError: Error | null;
  createPot: UseMutateFunction<
    Pot,
    Error,
    Omit<Pot, "potId" | "currency" | "creationDate" | "creationTime">,
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationFn: createPotApi,
    onSuccess: () => {
      showToast(
        "success",
        "Pot created successfully. Start saving towards your goals!",
      );

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError() {
      showToast(
        "error",
        "Whoops! Something went wrong while creating the pot. Give it another shot and let’s get you back on track!",
      );
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  return {
    createdPot: data,
    potStatus: status,
    potError: error,
    createPot: mutate,
  };
}

export { useCreatePot };
