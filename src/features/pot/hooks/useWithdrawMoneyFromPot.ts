import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createTransaction as createTransactionApi } from "../../../services/apiTransaction.ts";

import { handleCloseModal } from "../../../store/appModalStore.ts";

import type { Transaction } from "../../transaction/types/transaction.types.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

function useWithdrawMoneyFromPot(): {
  createdTransaction: Transaction | undefined;
  transactionStatus: "error" | "idle" | "pending" | "success";
  transactionError: Error | null;
  withdrawMoneyFromPot: UseMutateFunction<
    Transaction,
    Error,
    Omit<Transaction, "transactionId" | "creationTime">,
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationFn: createTransactionApi,
    onSuccess: () => {
      showToast("success", "Money successfully withdrawn from the pot!");

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError() {
      showToast(
        "error",
        "Failed to withdraw money from the pot. Please try again.",
      );
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  return {
    createdTransaction: data,
    transactionStatus: status,
    transactionError: error,
    withdrawMoneyFromPot: mutate,
  };
}

export { useWithdrawMoneyFromPot };
