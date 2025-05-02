import { type ReactNode } from "react";

import {
  setBudgetCache,
  setPotCache,
  setTransactionCache,
} from "../store/appCacheStore.ts";

import { useReadBudgets } from "../features/budget/hooks/useReadBudgets.ts";
import { useReadPots } from "../features/pot/hooks/useReadPots.ts";
import { useReadTransactions } from "../features/transaction/hooks/useReadTransactions.ts";

import PageSpinner from "../components/loaders/PageSpinner.tsx";
import Sidebar from "../components/sidebar/Sidebar.tsx";

function AppLayout({ children }: { children?: ReactNode }) {
  const {
    transactions,
    transactionsStatus,
    transactionsFetchStatus,
    transactionsError,
  } = useReadTransactions();

  const { budgets, budgetsStatus, budgetsFetchStatus, budgetsError } =
    useReadBudgets();

  const { pots, potsStatus, potsFetchStatus, potsError } = useReadPots();

  const isLoading =
    transactionsStatus === "pending" ||
    budgetsStatus === "pending" ||
    potsStatus === "pending" ||
    transactionsFetchStatus !== "idle" ||
    budgetsFetchStatus !== "idle" ||
    potsFetchStatus !== "idle";

  const isError =
    transactionsStatus === "error" ||
    budgetsStatus === "error" ||
    potsStatus === "error";

  const error = transactionsError || budgetsError || potsError;

  if (isError) throw new Error(error?.message);

  if (transactions.length > 0) {
    transactions.forEach((transaction) => {
      setTransactionCache(transaction.transactionId, transaction.category);
    });

    if (budgets.length > 0) {
      budgets.forEach((b) =>
        setBudgetCache(b.budgetId, b.category, b.creationDate, transactions),
      );
    }

    if (pots.length > 0) {
      pots.forEach((p) =>
        setPotCache(p.potId, p.name, p.creationDate, transactions),
      );
    }
  }

  return (
    <div className="flex h-screen max-h-screen min-h-screen overflow-hidden">
      <Sidebar />

      {isLoading && <PageSpinner />}

      {!isLoading && (
        <div className="flex-1 overflow-y-auto bg-orange-50 p-8">
          {children}
        </div>
      )}
    </div>
  );
}

export default AppLayout;
