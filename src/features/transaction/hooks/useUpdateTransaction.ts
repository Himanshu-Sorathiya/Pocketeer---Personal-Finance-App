import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateTransaction as updateTransactionApi } from "../../../services/apiTransaction.ts";

import { closeModal } from "../../../store/appModalStore.ts";

import type { Transaction } from "../types/transaction.types.ts";

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

  return {
    updatedTransaction: data,
    transactionStatus: status,
    transactionError: error,
    updateTransaction: mutate,
  };
}

export { useUpdateTransaction };
