import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  budgetQueryOptions,
  potQueryOptions,
  transactionQueryOptions,
} from "../services/queryOptions.ts";

import { setBudgets } from "../features/budget/store/budgetStore.ts";
import { setPots } from "../features/pot/store/potStore.ts";
import { setTransactions } from "../features/transaction/store/transactionStore.ts";
import {
  setBudgetCache,
  setPotCache,
  setTransactionCache,
} from "../store/appCacheStore.ts";

import PageSpinner from "../components/loaders/PageSpinner.tsx";
import Sidebar from "../components/sidebar/Sidebar.tsx";

function AppLayout({ children }: { children?: ReactNode }) {
  const {
    data: transactions,
    status: transactionsStatus,
    fetchStatus: transactionFetchStatus,
    error: transactionsError,
  } = useQuery({ ...transactionQueryOptions });

  const {
    data: budgets,
    status: budgetsStatus,
    fetchStatus: budgetsFetchStatus,
    error: budgetsError,
  } = useQuery({
    ...budgetQueryOptions,
    enabled: transactionsStatus === "success",
  });

  const {
    data: pots,
    status: potsStatus,
    fetchStatus: potsFetchStatus,
    error: potsError,
  } = useQuery({
    ...potQueryOptions,
    enabled: transactionsStatus === "success",
  });

  const isLoading =
    transactionsStatus === "pending" ||
    budgetsStatus === "pending" ||
    potsStatus === "pending" ||
    transactionFetchStatus !== "idle" ||
    budgetsFetchStatus !== "idle" ||
    potsFetchStatus !== "idle";

  const isError =
    transactionsStatus === "error" ||
    budgetsStatus === "error" ||
    potsStatus === "error";

  const error = transactionsError || budgetsError || potsError;

  if (isError) throw new Error(error?.message);

  if (transactions && budgets && pots) {
    setTransactions(transactions);
    setBudgets(budgets);
    setPots(pots);

    transactions.forEach((transaction) => {
      setTransactionCache(transaction.transactionId, transaction.category);
    });

    budgets.forEach((b) =>
      setBudgetCache(b.budgetId, b.category, b.creationDate, transactions),
    );

    pots.forEach((p) =>
      setPotCache(p.potId, p.name, p.creationDate, transactions),
    );
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
