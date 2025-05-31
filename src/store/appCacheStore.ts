import { Store } from "@tanstack/react-store";

import type { Budget } from "../features/budget/types/budget.types.ts";
import type { Pot } from "../features/pot/types/pot.types.ts";
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

function setTransactionCache(transactions: Transaction[]) {
  transactions.forEach(({ transactionId, category: transactionCategory }) => {
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
  });
}

function setBudgetCache(budgets: Budget[], transactions: Transaction[]) {
  const budgetTransactionsRecord: Record<string, Transaction[]> = {};

  budgets.forEach(({ category }) => {
    budgetTransactionsRecord[category] = [];
  });

  transactions.forEach((t) => {
    budgets.forEach(({ category, creationDate }) => {
      if (
        t.category === category &&
        t.type === "expense" &&
        new Date(t.creationDate) >= new Date(creationDate)
      ) {
        budgetTransactionsRecord[category].push(t);
      }
    });
  });

  budgets.forEach((budget) => {
    const sortedBudgetTransactions = budgetTransactionsRecord[
      budget.category
    ].sort((a, b) => {
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

      newCache.set(budget.budgetId, {
        creationDate: budget.creationDate,
        transactionsLength: sortedBudgetTransactions.length,
        transactions: sortedBudgetTransactions,
        amount:
          sortedBudgetTransactions.reduce((sum, t) => sum + t.amount, 0) ?? 0,
      });

      return newCache;
    });
  });
}

function setPotCache(pots: Pot[], transactions: Transaction[]) {
  const potTransactionsRecord: Record<string, Transaction[]> = {};

  pots.forEach(({ name }) => {
    potTransactionsRecord[name] = [];
  });

  transactions.forEach((t) => {
    pots.forEach(({ name, creationDate }) => {
      if (
        t.recipient === name &&
        t.category === "savings" &&
        new Date(t.creationDate) >= new Date(creationDate)
      ) {
        potTransactionsRecord[name].push(t);
      }
    });
  });

  pots.forEach((pot) => {
    const sortedPotTransactions = potTransactionsRecord[pot.name].sort(
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

      newCache.set(pot.potId, {
        creationDate: pot.creationDate,
        transactionsLength: sortedPotTransactions.length,
        transactions: sortedPotTransactions,
        amount,
      });

      return newCache;
    });
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
