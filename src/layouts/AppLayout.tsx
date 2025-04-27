import { type ReactNode } from "react";

import {
  setBudgetCache,
  setPotCache,
  setTransactionCache,
} from "../store/appCacheStore.ts";

import GlobalSpinner from "../components/loaders/GlobalSpinner.tsx";
import Sidebar from "../components/sidebar/Sidebar.tsx";
import { useBudgets } from "../hooks/useBudgets.ts";
import { usePots } from "../hooks/usePots.ts";
import { useTransactions } from "../hooks/useTransactions.ts";

function AppLayout({ children }: { children?: ReactNode }) {
  const {
    transactions,
    isLoading: isTransactionLoading,
    isError: isTransactionError,
    error: transactionError,
  } = useTransactions();

  const {
    budgets,
    isLoading: isBudgetLoading,
    isError: isBudgetError,
    error: budgetError,
  } = useBudgets();

  const {
    pots,
    isLoading: isPotLoading,
    isError: isPotError,
    error: potError,
  } = usePots();

  if (isTransactionLoading || isBudgetLoading || isPotLoading)
    return <GlobalSpinner />;

  if (isTransactionError || isBudgetError || isPotError)
    throw new Error(
      transactionError?.message || budgetError?.message || potError?.message,
    );

  transactions!.forEach((transaction) => {
    setTransactionCache(transaction.transactionId, transaction.category);
  });

  budgets!.forEach((b) =>
    setBudgetCache(b.budgetId, b.category, b.creationDate, transactions!),
  );

  pots!.forEach((p) =>
    setPotCache(p.potId, p.name, p.creationDate, transactions!),
  );

  return (
    <div className="flex h-screen max-h-screen min-h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-orange-50 p-8">{children}</div>
    </div>
  );
}

export default AppLayout;
