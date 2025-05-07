import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteBudget as deleteBudgetApi } from "../../../services/apiBudget.ts";

import { deleteBudgetCache } from "../../../store/appCacheStore.ts";
import { closeModal } from "../../../store/appModalStore.ts";
import { handleBudgetChange } from "../store/budgetStore.ts";

function useDeleteBudget(): {
  budgetStatus: "error" | "idle" | "pending" | "success";
  budgetError: Error | null;
  deleteBudget: UseMutateFunction<
    void,
    Error,
    {
      budgetId: string;
    },
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const { status, error, mutate } = useMutation({
    mutationFn: deleteBudgetApi,
    onSuccess: (_, { budgetId }) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });

      deleteBudgetCache(budgetId);

      handleBudgetChange("");
    },
    onError(error) {
      throw new Error(error?.message);
    },
    onSettled: () => {
      closeModal();
    },
  });

  return { budgetStatus: status, budgetError: error, deleteBudget: mutate };
}

export { useDeleteBudget };
