import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateBudget as updateBudgetApi } from "../../../services/apiBudget.ts";

import { handleCloseModal } from "../../../store/appModalStore.ts";

import type { Budget } from "../types/budget.types.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

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

  const { data, status, error, mutate } = useMutation({
    mutationFn: updateBudgetApi,
    onSuccess: () => {
      showToast(
        "success",
        "Budget updated successfully. Keep budgeting smart!",
      );

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError() {
      showToast(
        "error",
        "Whoops! Something went wrong while updating the budget. Give it another shot and let’s get you back on track!",
      );
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  return {
    updatedBudget: data,
    budgetStatus: status,
    budgetError: error,
    updateBudget: mutate,
  };
}

export { useUpdateBudget };
