import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createTransaction as createTransactionApi } from "../../../services/apiTransaction.ts";

import { handleCloseModal } from "../../../store/appModalStore.ts";

import type { Transaction } from "../types/transaction.types.ts";

function useCreateTransaction(): {
  createdTransaction: Transaction | undefined;
  transactionStatus: "error" | "idle" | "pending" | "success";
  transactionError: Error | null;
  createTransaction: UseMutateFunction<
    Transaction,
    Error,
    Omit<Transaction, "transactionId" | "currency" | "creationTime">,
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationFn: createTransactionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
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
    createdTransaction: data,
    transactionStatus: status,
    transactionError: error,
    createTransaction: mutate,
  };
}

export { useCreateTransaction };
