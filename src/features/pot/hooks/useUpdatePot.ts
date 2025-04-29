import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";

import { updatePot as updatePotApi } from "../../../services/apiPot.ts";
import { updateTransactions as updateTransactionsApi } from "../../../services/apiTransaction.ts";

import { potTransactionCacheStore } from "../../../store/appCacheStore.ts";
import { closeModal } from "../../../store/appModalStore.ts";

import type { Transaction } from "../../transaction/types/transaction.types.ts";
import type { Pot } from "../types/pot.types.ts";

function useUpdatePot(): {
  updatedPot: Pot | undefined;
  potStatus: "error" | "idle" | "pending" | "success";
  potError: Error | null;
  updatePot: UseMutateFunction<
    Pot,
    Error,
    {
      potId: string;
      updates: Partial<Pick<Pot, "name" | "targetAmount" | "theme">>;
    },
    unknown
  >;
} {
  const queryClient = useQueryClient();

  const transactionsMap = useStore(potTransactionCacheStore);

  const {
    data: updatedPot,
    status: potStatus,
    error: potError,
    mutate: updatePot,
  } = useMutation({
    mutationFn: async ({
      potId,
      updates,
    }: {
      potId: string;
      updates: Partial<Pick<Pot, "name" | "targetAmount" | "theme">>;
    }) => {
      const transactions: Transaction[] =
        transactionsMap.get(potId)?.transactions ?? [];

      if (transactions && transactions?.length > 0 && updates.name) {
        const transactionIds = transactions.map((t) => t.transactionId);
        await updateTransactionsApi(transactionIds, updates.name);
      }

      const updatedPotData = await updatePotApi(potId, updates);

      return updatedPotData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError(error) {
      throw new Error(error?.message);
    },
    onSettled: () => {
      closeModal();
    },
  });

  return { updatedPot, potStatus, potError, updatePot };
}

export { useUpdatePot };
