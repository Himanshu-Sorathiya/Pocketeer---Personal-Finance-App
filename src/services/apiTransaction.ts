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
    .eq("user_id", queryKey[1])
    .order("creation_date", { ascending: false })
    .order("creation_time", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const transactions: Transaction[] = data.map((item) => ({
    user_id: item.user_id,
    transactionId: item.transaction_id,
    recipient: item.recipient,
    category: item.category as TransactionCategory,
    amount: item.amount,
    type: item.type as TransactionType,
    creationDate: item.creation_date,
    creationTime: item.creation_time,
  }));

  return transactions;
}

async function createTransaction(
  transaction: Omit<Transaction, "transactionId" | "creationTime">,
): Promise<Transaction> {
  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        user_id: transaction.user_id,
        recipient: transaction.recipient,
        category: transaction.category,
        amount: transaction.amount,
        type: transaction.type,
        creation_date: transaction.creationDate,
        creation_time:
          transaction.creationDate === new Date().toISOString().split("T")[0]
            ? new Date().toTimeString().slice(0, 8)
            : "23:59:59",
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    user_id: data.user_id,
    transactionId: data.transaction_id,
    recipient: data.recipient,
    category: data.category,
    amount: data.amount,
    type: data.type,
    creationDate: data.creation_date,
    creationTime: data.creation_time,
  };
}

async function updateTransaction({
  transactionId,
  updates,
}: {
  transactionId: string;
  updates: Partial<
    Pick<
      Transaction,
      "recipient" | "category" | "amount" | "creationDate" | "type"
    >
  >;
}): Promise<Transaction> {
  const { data, error } = await supabase
    .from("transactions")
    .update({
      ...("recipient" in updates && { recipient: updates.recipient }),
      ...("category" in updates && { category: updates.category }),
      ...("amount" in updates && { amount: updates.amount }),
      ...("type" in updates && { type: updates.type }),
      ...("creationDate" in updates && {
        creation_date: updates.creationDate,
        creation_time:
          updates.creationDate === new Date().toISOString().split("T")[0]
            ? "00:00:00"
            : "23:59:59",
      }),
    })
    .eq("transaction_id", transactionId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    user_id: data.user_id,
    transactionId: data.transaction_id,
    recipient: data.recipient,
    category: data.category,
    amount: data.amount,
    type: data.type,
    creationDate: data.creation_date,
    creationTime: data.creation_time,
  };
}

async function deleteTransaction({ transactionId }: { transactionId: string }) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("transaction_id", transactionId);

  if (error) {
    throw new Error(error.message);
  }
}

async function updateTransactions(
  transactionIds: string[],
  newRecipient: string,
) {
  const { error } = await supabase
    .from("transactions")
    .update({ recipient: newRecipient })
    .in("transaction_id", transactionIds);

  if (error) {
    throw new Error(error.message);
  }
}

async function deleteTransactions(transactionIds: string[]) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .in("transaction_id", transactionIds);

  if (error) {
    throw new Error(error.message);
  }
}

export {
  createTransaction,
  deleteTransaction,
  deleteTransactions,
  getTransactions,
  updateTransaction,
  updateTransactions,
};
