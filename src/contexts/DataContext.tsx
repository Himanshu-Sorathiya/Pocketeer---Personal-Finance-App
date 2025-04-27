import { type ReactNode, createContext, useContext, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  budgetQueryOptions,
  potQueryOptions,
  transactionQueryOptions,
} from "../services/queryOptions.ts";

import type { Budget } from "../features/budget/types/budget.types.ts";
import type { Pot } from "../features/pot/types/pot.types.ts";
import type { Transaction } from "../features/transaction/types/transaction.types.ts";

interface DataContextType {
  transactions: Transaction[] | undefined;
  budgets: Budget[] | undefined;
  pots: Pot[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  selectedBudgetId: string;
  setSelectedBudgetId: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

function DataContextProvider({ children }: { children: ReactNode }) {
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

  const [selectedBudgetId, setSelectedBudgetId] = useState<string>(
    budgets?.[0].budgetId ?? "",
  );

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

  return (
    <DataContext.Provider
      value={{
        transactions,
        budgets,
        pots,
        isLoading,
        isError,
        error,
        selectedBudgetId,
        setSelectedBudgetId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used within a DataContextProvider");
  }

  return context;
}

export { DataContextProvider, useData };
