import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { getBudgets } from "../services/apiBudget.ts";
import { getPots } from "../services/apiPot.ts";
import { getTransactions } from "../services/apiTransaction.ts";

import {
  setBudgetCache,
  setPotCache,
  setTransactionCache,
} from "../store/appCacheStore.ts";

import GlobalSpinner from "../components/loaders/GlobalSpinner.tsx";
import Sidebar from "../components/sidebar/Sidebar.tsx";

const user_id = "e8c67e26-6d1e-4fd5-9a87-2bf852cb2c35";

function AppLayout({ children }: { children?: ReactNode }) {
  const {
    data: transactions,
    status: transactionsStatus,
    error: transactionError,
  } = useQuery({
    queryKey: ["transactions", user_id],
    queryFn: getTransactions,
  });

  const {
    data: budgets,
    status: budgetsStatus,
    error: budgetError,
  } = useQuery({
    queryKey: ["budgets", user_id],
    queryFn: getBudgets,
  });

  const {
    data: pots,
    status: potsStatus,
    error: potError,
  } = useQuery({
    queryKey: ["pots", user_id],
    queryFn: getPots,
  });

  if (
    transactionsStatus === "pending" ||
    budgetsStatus === "pending" ||
    potsStatus === "pending"
  )
    return <GlobalSpinner />;

  if (
    transactionsStatus === "error" ||
    budgetsStatus === "error" ||
    potsStatus === "error"
  )
    throw new Error(
      transactionError?.message || budgetError?.message || potError?.message,
    );

  transactions.forEach((transaction) => {
    setTransactionCache(transaction.transactionId, transaction.category);
  });

  budgets.forEach((b) =>
    setBudgetCache(b.budgetId, b.category, b.creationDate, transactions),
  );

  pots.forEach((p) =>
    setPotCache(p.potId, p.name, p.creationDate, transactions),
  );

  return (
    <div className="flex h-screen max-h-screen min-h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-orange-50 p-8">{children}</div>
    </div>
  );
}

export default AppLayout;
