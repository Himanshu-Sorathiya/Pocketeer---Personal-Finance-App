import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deletePot as deletePotApi } from "../../../services/apiPot.ts";

import { deletePotCache } from "../../../store/appCacheStore.ts";
import { handleCloseModal } from "../../../store/appModalStore.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

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
      showToast("success", "Pot removed. Financial structure adjusted!");

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });

      deletePotCache(potId);
    },
    onError() {
      showToast(
        "error",
        "Whoops! Couldn’t delete the pot. Give it another shot and let’s get you back on track!",
      );
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  return { potStatus: status, potError: error, deletePot: mutate };
}

export { useDeletePot };
