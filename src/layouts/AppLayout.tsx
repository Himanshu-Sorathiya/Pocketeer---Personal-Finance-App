import { type ReactNode } from "react";

import { useData } from "../contexts/DataContext.tsx";

import {
  setBudgetCache,
  setPotCache,
  setTransactionCache,
} from "../store/appCacheStore.ts";

import PageSpinner from "../components/loaders/PageSpinner.tsx";
import Sidebar from "../components/sidebar/Sidebar.tsx";

function AppLayout({ children }: { children?: ReactNode }) {
  const { transactions, budgets, pots, isLoading, isError, error } = useData();

  if (transactions && budgets && pots) {
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

  if (isError) throw new Error(error?.message);

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
