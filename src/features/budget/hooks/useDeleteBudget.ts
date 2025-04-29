import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteBudget as deleteBudgetApi } from "../../../services/apiBudget.ts";

import { closeModal } from "../../../store/appModalStore.ts";

function useDeleteBudget(): {
  budgetStatus: "error" | "idle" | "pending" | "success";
  budgetError: Error | null;
  deleteBudget: UseMutateFunction<void, Error, string, unknown>;
} {
  const queryClient = useQueryClient();

  const {
    status: budgetStatus,
    error: budgetError,
    mutate: deleteBudget,
  } = useMutation({
    mutationFn: deleteBudgetApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError(error) {
      throw new Error(error?.message);
    },
    onSettled: () => {
      closeModal();
    },
  });

  return { budgetStatus, budgetError, deleteBudget };
}

export { useDeleteBudget };
