import { useStore } from "@tanstack/react-store";

import { transactionStore } from "../../transaction/store/transactionStore.ts";

import type {
  Transaction,
  TransactionCategory,
} from "../../transaction/types/transaction.types.ts";

function filterTransactionsByBudget(
  creationDate: string,
  category: TransactionCategory,
): Transaction[] {
  const budgetDate = new Date(creationDate);

  const transactions: Transaction[] = [
    ...useStore(transactionStore, (s) => s.transactions),
  ];

  return transactions.filter(
    (t) =>
      t.type === "expense" &&
      new Date(t.date) >= budgetDate &&
      t.category === category,
  );
}

export { filterTransactionsByBudget };
