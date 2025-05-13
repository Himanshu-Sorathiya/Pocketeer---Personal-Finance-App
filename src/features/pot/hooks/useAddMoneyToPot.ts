import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createTransaction as createTransactionApi } from "../../../services/apiTransaction.ts";

import { handleCloseModal } from "../../../store/appModalStore.ts";

import type { Transaction } from "../../transaction/types/transaction.types.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

function useAddMoneyToPot(): {
  createdTransaction: Transaction | undefined;
  transactionStatus: "error" | "idle" | "pending" | "success";
  transactionError: Error | null;
  addMoneyToPot: UseMutateFunction<
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
      showToast("success", "Money successfully added to the pot!");

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError() {
      showToast("error", "Failed to add money to the pot. Please try again.");
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  return {
    createdTransaction: data,
    transactionStatus: status,
    transactionError: error,
    addMoneyToPot: mutate,
  };
}

export { useAddMoneyToPot };
