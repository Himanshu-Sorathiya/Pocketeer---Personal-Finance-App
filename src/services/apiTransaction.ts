import type { QueryKey } from "@tanstack/react-query";

import { currency, user_id } from "../constants/user.ts";

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
    creationTime: item.creation_time,
  }));

  return transactions;
}

async function addTransaction(
  transaction: Omit<
    Transaction,
    "user_id" | "transactionId" | "currency" | "creationTime"
  >,
): Promise<Transaction> {
  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        user_id,
        recipient: transaction.recipient,
        category: transaction.category,
        amount: transaction.amount,
        type: transaction.type,
        currency,
        creation_date: transaction.creationDate,
        creation_time: new Date().toTimeString().slice(0, 8),
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(
      "Uh-oh! We ran into an issue while adding your transaction. But don’t worry—Pocketeer will get things back on track soon!",
    );
  }

  return {
    user_id: data.user_id,
    transactionId: data.transaction_id,
    recipient: data.recipient,
    category: data.category,
    amount: data.amount,
    type: data.type,
    currency: data.currency,
    creationDate: data.creation_date,
    creationTime: data.creation_time,
  };
}

export { addTransaction, getTransactions };
