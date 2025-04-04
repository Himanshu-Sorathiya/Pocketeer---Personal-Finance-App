import type {
  Transaction,
  TransactionCategory,
} from "../../transaction/types/transaction.types.ts";

function filterTransactionsByBudget(
  creationDate: string,
  category: TransactionCategory,
  transactions: Transaction[],
): Transaction[] {
  const budgetDate = new Date(creationDate);

  return transactions.filter(
    (t) =>
      t.type === "expense" &&
      new Date(t.date) >= budgetDate &&
      t.category === category,
  );
}

export { filterTransactionsByBudget };
