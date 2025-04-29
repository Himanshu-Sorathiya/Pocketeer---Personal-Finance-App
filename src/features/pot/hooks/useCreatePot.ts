import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { addPot } from "../../../services/apiPot.ts";

import { closeModal } from "../../../store/appModalStore.ts";

import type { Pot } from "../types/pot.types.ts";

function useCreatePot(): {
  pot: Pot | undefined;
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

  const {
    data: pot,
    status: potStatus,
    error: potError,
    mutate: createPot,
  } = useMutation({
    mutationFn: addPot,
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
    pot,
    potStatus,
    potError,
    createPot,
  };
}

export { useCreatePot };
