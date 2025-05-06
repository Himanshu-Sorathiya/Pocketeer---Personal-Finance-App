import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useStore } from "@tanstack/react-store";

import { deletePot as deletePotApi } from "../../../services/apiPot.ts";
import { deleteTransactions as deleteTransactionsApi } from "../../../services/apiTransaction.ts";

import {
  deletePotCache,
  potTransactionCacheStore,
} from "../../../store/appCacheStore.ts";
import { closeModal } from "../../../store/appModalStore.ts";

import type { Transaction } from "../../transaction/types/transaction.types.ts";

function useDeletePot(): {
  potStatus: "error" | "idle" | "pending" | "success";
  potError: Error | null;
  deletePot: UseMutateFunction<void, Error, string, unknown>;
} {
  const queryClient = useQueryClient();

  const transactionsMap = useStore(potTransactionCacheStore);

  const {
    status: potStatus,
    error: potError,
    mutate: deletePot,
  } = useMutation({
    mutationFn: async (potId: string) => {
      const transactions: Transaction[] =
        transactionsMap.get(potId)?.transactions ?? [];

      if (transactions && transactions?.length > 0) {
        const transactionIds = transactions.map((t) => t.transactionId);
        await deleteTransactionsApi(transactionIds);
      }

      await deletePotApi(potId);
    },
    onSuccess: (_, potId) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["pots"] });

      deletePotCache(potId);
    },
    onError(error) {
      throw new Error(error?.message);
    },
    onSettled: () => {
      closeModal();
    },
  });

  return { potStatus, potError, deletePot };
}

export { useDeletePot };
