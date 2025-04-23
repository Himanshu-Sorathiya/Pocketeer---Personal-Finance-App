import type { QueryKey } from "@tanstack/react-query";

import { supabase } from "./supabase.ts";

import type { Transaction } from "../features/transaction/types/transaction.types.ts";

import type {
  TransactionCategory,
  TransactionType,
} from "../constants/transactionConfig.ts";

async function getTransactions({
  queryKey,
}: {
  queryKey: QueryKey;
}): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", queryKey[1]);

  if (error) {
    throw new Error(
      "Uh-oh! We ran into an issue while fetching your transactions. But don’t worry—Pocketeer will get things back on track soon!",
    );
  }

  const transactions: Transaction[] = data.map((item) => ({
    user_id: item.user_id,
    transactionId: item.transaction_id,
    recipient: item.recipient,
    category: item.category as TransactionCategory,
    amount: item.amount,
    type: item.type as TransactionType,
    currency: item.currency,
    creationDate: item.creation_date,
  }));

  return transactions;
}

export { getTransactions };
