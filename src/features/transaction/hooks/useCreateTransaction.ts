import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { addTransaction } from "../../../services/apiTransaction.ts";

import { closeModal } from "../../../store/appModalStore.ts";

import type { Transaction } from "../types/transaction.types.ts";

function useCreateTransaction(): {
  transaction: Transaction | undefined;
  transactionStatus: "error" | "idle" | "pending" | "success";
  transactionError: Error | null;
  createTransaction: UseMutateFunction<
    Transaction,
    Error,
    Omit<
      Transaction,
      "user_id" | "transactionId" | "currency" | "creationTime"
    >,
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const {
    data: transaction,
    status: transactionStatus,
    error: transactionError,
    mutate: createTransaction,
  } = useMutation({
    mutationFn: addTransaction,
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
    transaction,
    transactionStatus,
    transactionError,
    createTransaction,
  };
}

export { useCreateTransaction };
