import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteBudget as deleteBudgetApi } from "../../../services/apiBudget.ts";

import { deleteBudgetCache } from "../../../store/appCacheStore.ts";
import { handleCloseModal } from "../../../store/appModalStore.ts";
import { handleBudgetChange } from "../store/budgetStore.ts";

import { showToast } from "../../../utilities/toastUtils.tsx";

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
      showToast("success", "Budget removed. Financial focus realigned!");

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });

      deleteBudgetCache(budgetId);

      handleBudgetChange("");
    },
    onError() {
      showToast(
        "error",
        "Whoops! Couldn’t delete the budget. Give it another shot and let’s get you back on track!",
      );
    },
    onSettled: () => {
      handleCloseModal();
    },
  });

  return { budgetStatus: status, budgetError: error, deleteBudget: mutate };
}

export { useDeleteBudget };
