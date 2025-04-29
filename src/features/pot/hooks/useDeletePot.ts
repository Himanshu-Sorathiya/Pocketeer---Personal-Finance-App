import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deletePot as deletePotApi } from "../../../services/apiPot.ts";

import { closeModal } from "../../../store/appModalStore.ts";

function useDeletePot(): {
  potStatus: "error" | "idle" | "pending" | "success";
  potError: Error | null;
  deletePot: UseMutateFunction<void, Error, string, unknown>;
} {
  const queryClient = useQueryClient();

  const {
    status: potStatus,
    error: potError,
    mutate: deletePot,
  } = useMutation({
    mutationFn: deletePotApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError(error) {
      throw new Error(error?.message);
    },
    onSettled: () => {
      closeModal();
    },
  });

  return { potStatus, potError, deletePot };
}

export { useDeletePot };
