import { Store } from "@tanstack/react-store";

import type { Transaction } from "../features/transaction/types/transaction.types.ts";

type TransactionCache = {
  creationDate: string;
  transactionsLength: number;
  transactions: Transaction[];
  amount: number;
};

const budgetTransactionCacheStore = new Store<Map<string, TransactionCache>>(
  new Map(),
);

const potTransactionCacheStore = new Store<Map<string, TransactionCache>>(
  new Map(),
);

function setBudgetCache(
  budgetId: string,
  category: string,
  creationDate: string,
  transactions: Transaction[],
) {
  const filteredTransactions: Transaction[] = transactions.filter(
    (t) =>
      t.type === "expense" &&
      new Date(t.creationDate) >= new Date(creationDate) &&
      t.category.trim() === category.trim(),
  );

  budgetTransactionCacheStore.setState((state) => {
    const newCache = new Map(state);
    newCache.set(budgetId, {
      creationDate,
      transactionsLength: filteredTransactions.length,
      transactions: filteredTransactions,
      amount: filteredTransactions.reduce((sum, t) => sum + t.amount, 0) ?? 0,
    });

    return newCache;
  });
}

function setPotCache(
  potId: string,
  potName: string,
  creationDate: string,
  transactions: Transaction[],
) {
  const filteredTransactions: Transaction[] = transactions.filter(
    (t) =>
      t.type === "income" &&
      new Date(t.creationDate) >= new Date(creationDate) &&
      t.recipient.trim() === potName.trim(),
  );

  potTransactionCacheStore.setState((state) => {
    const newCache = new Map(state);
    newCache.set(potId, {
      creationDate,
      transactionsLength: filteredTransactions.length,
      transactions: filteredTransactions,
      amount: filteredTransactions.reduce((sum, t) => sum + t.amount, 0) ?? 0,
    });

    return newCache;
  });
}

export {
  budgetTransactionCacheStore,
  potTransactionCacheStore,
  setBudgetCache,
  setPotCache,
};
