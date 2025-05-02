import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createBudget as createBudgetApi } from "../../../services/apiBudget.ts";

import { closeModal } from "../../../store/appModalStore.ts";
import { handleBudgetChange } from "../store/budgetStore.ts";

import type { Budget } from "../types/budget.types.ts";

function useCreateBudget(): {
  createdBudget: Budget | undefined;
  budgetStatus: "error" | "idle" | "pending" | "success";
  budgetError: Error | null;
  createBudget: UseMutateFunction<
    Budget,
    Error,
    Omit<
      Budget,
      "user_id" | "budgetId" | "currency" | "creationDate" | "creationTime"
    >,
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const {
    data: createdBudget,
    status: budgetStatus,
    error: budgetError,
    mutate: createBudget,
  } = useMutation({
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
      closeModal();
    },
  });

  return {
    createdBudget,
    budgetStatus,
    budgetError,
    createBudget,
  };
}

export { useCreateBudget };
