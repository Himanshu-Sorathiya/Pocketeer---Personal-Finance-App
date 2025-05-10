import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updatePot as updatePotApi } from "../../../services/apiPot.ts";

import { handleCloseModal } from "../../../store/appModalStore.ts";

import type { Pot } from "../types/pot.types.ts";

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
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError(error) {
      throw new Error(error?.message);
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
