import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateBudget as updateBudgetApi } from "../../../services/apiBudget.ts";

import { closeModal } from "../../../store/appModalStore.ts";

import type { Budget } from "../types/budget.types.ts";

function useUpdateBudget(): {
  updatedBudget: Budget | undefined;
  budgetStatus: "error" | "idle" | "pending" | "success";
  budgetError: Error | null;
  updateBudget: UseMutateFunction<
    Budget,
    Error,
    {
      budgetId: string;
      updates: Partial<Pick<Budget, "category" | "targetAmount" | "theme">>;
    },
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const {
    data: updatedBudget,
    status: budgetStatus,
    error: budgetError,
    mutate: updateBudget,
  } = useMutation({
    mutationFn: ({
      budgetId,
      updates,
    }: {
      budgetId: string;
      updates: Partial<Pick<Budget, "category" | "targetAmount" | "theme">>;
    }) => updateBudgetApi(budgetId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError(error) {
      throw new Error(error?.message);
    },
    onSettled: () => {
      closeModal();
    },
  });

  return { updatedBudget, budgetStatus, budgetError, updateBudget };
}

export { useUpdateBudget };
