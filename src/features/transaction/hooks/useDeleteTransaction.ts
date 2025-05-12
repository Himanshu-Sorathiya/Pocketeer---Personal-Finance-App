import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteTransaction as deleteTransactionApi } from "../../../services/apiTransaction.ts";

import { deleteTransactionCache } from "../../../store/appCacheStore.ts";
import { handleCloseModal } from "../../../store/appModalStore.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

function useDeleteTransaction(): {
  transactionStatus: "error" | "idle" | "pending" | "success";
  transactionError: Error | null;
  deleteTransaction: UseMutateFunction<
    void,
    Error,
    {
      transactionId: string;
    },
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const { status, error, mutate } = useMutation({
    mutationFn: deleteTransactionApi,
    onSuccess: (_, { transactionId }) => {
      showToast("success", "Transaction removed from your records. All set!");

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });

      deleteTransactionCache(transactionId);
    },
    onError() {
      showToast(
        "error",
        "Whoops! Couldn’t delete the transaction. Give it another shot and let’s get you back on track!",
      );
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  return {
    transactionStatus: status,
    transactionError: error,
    deleteTransaction: mutate,
  };
}

export { useDeleteTransaction };
