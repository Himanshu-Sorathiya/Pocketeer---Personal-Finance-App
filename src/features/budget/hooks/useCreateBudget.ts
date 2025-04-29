import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { addBudget } from "../../../services/apiBudget.ts";

import { closeModal } from "../../../store/appModalStore.ts";
import type { Budget } from "../types/budget.types.ts";

function useCreateBudget(): {
  budget: Budget | undefined;
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
    data: budget,
    status: budgetStatus,
    error: budgetError,
    mutate: createBudget,
  } = useMutation({
    mutationFn: addBudget,
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

  return {
    budget,
    budgetStatus,
    budgetError,
    createBudget,
  };
}

export { useCreateBudget };
