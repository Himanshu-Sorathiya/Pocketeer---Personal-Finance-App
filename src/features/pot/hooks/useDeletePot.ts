import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deletePot as deletePotApi } from "../../../services/apiPot.ts";

import { deletePotCache } from "../../../store/appCacheStore.ts";
import { closeModal } from "../../../store/appModalStore.ts";

function useDeletePot(): {
  potStatus: "error" | "idle" | "pending" | "success";
  potError: Error | null;
  deletePot: UseMutateFunction<
    void,
    Error,
    {
      potId: string;
      transactionIds: string[];
    },
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const { status, error, mutate } = useMutation({
    mutationFn: deletePotApi,

    onSuccess: (_, { potId }) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });

      deletePotCache(potId);
    },
    onError(error) {
      throw new Error(error?.message);
    },
    onSettled: () => {
      closeModal();
    },
  });

  return { potStatus: status, potError: error, deletePot: mutate };
}

export { useDeletePot };
