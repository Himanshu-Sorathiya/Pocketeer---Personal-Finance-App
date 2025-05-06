import { Store } from "@tanstack/react-store";

import type { Transaction } from "../features/transaction/types/transaction.types.ts";

import { themeColors } from "../constants/appOptions.ts";
import { transactionIconsMap } from "../constants/transactionConfig.ts";

function getRandomIcon(category: string) {
  const maxIcons =
    transactionIconsMap[category as keyof typeof transactionIconsMap] || 1;
  const randomNum = Math.floor(Math.random() * maxIcons) + 1;

  return `/src/assets/icons/transaction_icons_sprite.svg#${category}${randomNum}`;
}

function getRandomColor() {
  return themeColors[Math.floor(Math.random() * (themeColors.length - 1))].hex;
}

type TransactionCache = {
  creationDate: string;
  transactionsLength: number;
  transactions: Transaction[];
  amount: number;
};

type TransactionIconCache = {
  iconPath: string;
  bgColor: string;
};

const transactionIconCacheStore = new Store<Map<string, TransactionIconCache>>(
  new Map(),
);

const budgetTransactionCacheStore = new Store<Map<string, TransactionCache>>(
  new Map(),
);

const potTransactionCacheStore = new Store<Map<string, TransactionCache>>(
  new Map(),
);

function setTransactionCache(
  transactionId: string,
  transactionCategory: string,
) {
  const iconPath = getRandomIcon(transactionCategory);
  const bgColor = getRandomColor();

  transactionIconCacheStore.setState((state) => {
    const newCache = new Map(state);

    if (!newCache.has(transactionId)) {
      newCache.set(transactionId, {
        iconPath,
        bgColor,
      });
    }

    return newCache;
  });
}

function setBudgetCache(
  budgetId: string,
  budgetCategory: string,
  budgetCreationDate: string,
  transactions: Transaction[],
) {
  const filteredBudgetTransactions: Transaction[] = transactions.filter(
    (t) =>
      t.category.trim() === budgetCategory.trim() &&
      new Date(t.creationDate) >= new Date(budgetCreationDate) &&
      t.type === "expense",
  );

  const sortedBudgetTransactions: Transaction[] =
    filteredBudgetTransactions.sort((a, b) => {
      const dateA = new Date(a.creationDate).getTime();
      const dateB = new Date(b.creationDate).getTime();

      if (dateA === dateB) {
        const timeA = a.creationTime.split(":").join("");
        const timeB = b.creationTime.split(":").join("");

        return Number(timeB) - Number(timeA);
      }

      return dateB - dateA;
    });

  budgetTransactionCacheStore.setState((state) => {
    const newCache = new Map(state);

    newCache.set(budgetId, {
      creationDate: budgetCreationDate,
      transactionsLength: sortedBudgetTransactions.length,
      transactions: sortedBudgetTransactions,
      amount:
        sortedBudgetTransactions.reduce((sum, t) => sum + t.amount, 0) ?? 0,
    });

    return newCache;
  });
}

function setPotCache(
  potId: string,
  potName: string,
  potCreationDate: string,
  transactions: Transaction[],
) {
  const filteredPotTransactions: Transaction[] = transactions.filter(
    (t) =>
      t.recipient.trim() === potName.trim() &&
      t.category.trim() === "savings" &&
      new Date(t.creationDate) >= new Date(potCreationDate),
  );

  const sortedPotTransactions: Transaction[] = filteredPotTransactions.sort(
    (a, b) => {
      const dateA = new Date(a.creationDate).getTime();
      const dateB = new Date(b.creationDate).getTime();

      if (dateA === dateB) {
        const timeA = a.creationTime.split(":").join("");
        const timeB = b.creationTime.split(":").join("");

        return Number(timeB) - Number(timeA);
      }

      return dateB - dateA;
    },
  );

  potTransactionCacheStore.setState((state) => {
    const newCache = new Map(state);

    const amount = sortedPotTransactions.reduce((sum, t) => {
      return t.type === "income" ? sum + t.amount : sum - t.amount;
    }, 0);

    newCache.set(potId, {
      creationDate: potCreationDate,
      transactionsLength: sortedPotTransactions.length,
      transactions: sortedPotTransactions,
      amount,
    });

    return newCache;
  });
}

function deleteTransactionCache(transactionId: string) {
  transactionIconCacheStore.setState((state) => {
    const newCache = new Map(state);

    newCache.delete(transactionId);

    return newCache;
  });
}

function deleteBudgetCache(budgetId: string) {
  budgetTransactionCacheStore.setState((state) => {
    const newCache = new Map(state);

    newCache.delete(budgetId);

    return newCache;
  });
}

function deletePotCache(potId: string) {
  potTransactionCacheStore.setState((state) => {
    const newCache = new Map(state);

    newCache.delete(potId);

    return newCache;
  });
}

export {
  budgetTransactionCacheStore,
  deleteBudgetCache,
  deletePotCache,
  deleteTransactionCache,
  potTransactionCacheStore,
  setBudgetCache,
  setPotCache,
  setTransactionCache,
  transactionIconCacheStore,
};
