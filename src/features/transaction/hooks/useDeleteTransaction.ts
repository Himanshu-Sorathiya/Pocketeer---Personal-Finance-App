import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteTransaction as deleteTransactionApi } from "../../../services/apiTransaction.ts";

import { closeModal } from "../../../store/appModalStore.ts";

function useDeleteTransaction(): {
  transactionStatus: "error" | "idle" | "pending" | "success";
  transactionError: Error | null;
  deleteTransaction: UseMutateFunction<void, Error, string, unknown>;
} {
  const queryClient = useQueryClient();

  const {
    status: transactionStatus,
    error: transactionError,
    mutate: deleteTransaction,
  } = useMutation({
    mutationFn: deleteTransactionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError(error) {
      throw new Error(error?.message);
    },
    onSettled: () => {
      closeModal();
    },
  });

  return { transactionStatus, transactionError, deleteTransaction };
}

export { useDeleteTransaction };
