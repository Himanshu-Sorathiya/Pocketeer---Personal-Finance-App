import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateTransaction as updateTransactionApi } from "../../../services/apiTransaction.ts";

import { handleCloseModal } from "../../../store/appModalStore.ts";

import type { Transaction } from "../types/transaction.types.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

function useUpdateTransaction(): {
  updatedTransaction: Transaction | undefined;
  transactionStatus: "error" | "idle" | "pending" | "success";
  transactionError: Error | null;
  updateTransaction: UseMutateFunction<
    Transaction,
    Error,
    {
      transactionId: string;
      updates: Partial<
        Pick<
          Transaction,
          "recipient" | "category" | "amount" | "creationDate" | "type"
        >
      >;
    },
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationFn: updateTransactionApi,
    onSuccess: () => {
      showToast("success", "Transaction updated successfully. Stay organized!");

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError() {
      showToast(
        "error",
        "Whoops! Something went wrong while updating the transaction. Give it another shot and let’s get you back on track!",
      );
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  return {
    updatedTransaction: data,
    transactionStatus: status,
    transactionError: error,
    updateTransaction: mutate,
  };
}

export { useUpdateTransaction };
