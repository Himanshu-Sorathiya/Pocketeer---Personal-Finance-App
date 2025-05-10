import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createBudget as createBudgetApi } from "../../../services/apiBudget.ts";

import { handleCloseModal } from "../../../store/appModalStore.ts";
import { handleBudgetChange } from "../store/budgetStore.ts";

import type { Budget } from "../types/budget.types.ts";

function useCreateBudget(): {
  createdBudget: Budget | undefined;
  budgetStatus: "error" | "idle" | "pending" | "success";
  budgetError: Error | null;
  createBudget: UseMutateFunction<
    Budget,
    Error,
    Omit<Budget, "budgetId" | "currency" | "creationDate" | "creationTime">,
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const { data, status, error, mutate } = useMutation({
    mutationFn: createBudgetApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });

      handleBudgetChange(data.budgetId || "");
    },
    onError(error) {
      throw new Error(error?.message);
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  return {
    createdBudget: data,
    budgetStatus: status,
    budgetError: error,
    createBudget: mutate,
  };
}

export { useCreateBudget };
