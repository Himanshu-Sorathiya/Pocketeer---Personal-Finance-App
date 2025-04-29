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

function setTransactionCache(transactionId: string, category: string) {
  const iconPath = getRandomIcon(category);
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
  category: string,
  creationDate: string,
  transactions: Transaction[],
) {
  const filteredTransactions: Transaction[] = transactions.filter(
    (t) =>
      t.category.trim() === category.trim() &&
      new Date(t.creationDate) >= new Date(creationDate) &&
      t.type === "expense",
  );

  const sortedTransactions: Transaction[] = filteredTransactions.sort(
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

  budgetTransactionCacheStore.setState((state) => {
    const newCache = new Map(state);

    newCache.set(budgetId, {
      creationDate,
      transactionsLength: sortedTransactions.length,
      transactions: sortedTransactions,
      amount: sortedTransactions.reduce((sum, t) => sum + t.amount, 0) ?? 0,
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
      t.recipient.trim() === potName.trim() &&
      new Date(t.creationDate) >= new Date(creationDate),
  );

  const sortedTransactions: Transaction[] = filteredTransactions.sort(
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

    const amount = sortedTransactions.reduce((sum, t) => {
      return t.type === "income" ? sum + t.amount : sum - t.amount;
    }, 0);

    newCache.set(potId, {
      creationDate,
      transactionsLength: sortedTransactions.length,
      transactions: sortedTransactions,
      amount,
    });

    return newCache;
  });
}

export {
  budgetTransactionCacheStore,
  potTransactionCacheStore,
  setBudgetCache,
  setPotCache,
  setTransactionCache,
  transactionIconCacheStore,
};
