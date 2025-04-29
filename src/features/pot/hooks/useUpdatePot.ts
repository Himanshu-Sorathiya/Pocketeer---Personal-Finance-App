import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updatePot as updatePotApi } from "../../../services/apiPot.ts";

import { closeModal } from "../../../store/appModalStore.ts";

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
    },
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const {
    data: updatedPot,
    status: potStatus,
    error: potError,
    mutate: updatePot,
  } = useMutation({
    mutationFn: ({
      potId,
      updates,
    }: {
      potId: string;
      updates: Partial<Pick<Pot, "name" | "targetAmount" | "theme">>;
    }) => updatePotApi(potId, updates),
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

  return { updatedPot, potStatus, potError, updatePot };
}

export { useUpdatePot };
