import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createPot as createPotApi } from "../../../services/apiPot.ts";

import { closeModal } from "../../../store/appModalStore.ts";

import type { Pot } from "../types/pot.types.ts";

function useCreatePot(): {
  createdPot: Pot | undefined;
  potStatus: "error" | "idle" | "pending" | "success";
  potError: Error | null;
  createPot: UseMutateFunction<
    Pot,
    Error,
    Omit<
      Pot,
      "user_id" | "potId" | "currency" | "creationDate" | "creationTime"
    >,
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationFn: createPotApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError(error) {
      throw new Error(error?.message);
    },
    onSettled: () => {
      closeModal();
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
