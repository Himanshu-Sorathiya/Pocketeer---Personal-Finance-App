import { type ReactNode } from "react";

import { useStore } from "@tanstack/react-store";

import ModalLayout from "./ModalLayout.tsx";

import {
  setBudgetCache,
  setPotCache,
  setTransactionCache,
} from "../store/appCacheStore.ts";
import { modalStore } from "../store/appModalStore.ts";

import { useReadBudgets } from "../features/budget/hooks/useReadBudgets.ts";
import { useReadPots } from "../features/pot/hooks/useReadPots.ts";
import { useReadTransactions } from "../features/transaction/hooks/useReadTransactions.ts";
import { useCurrencyRates } from "../hooks/useCurrencyRates.ts";

import PageSpinner from "../components/loaders/PageSpinner.tsx";
import ActionNotAllowedModal from "../components/modals/ActionNotAllowedModal.tsx";
import Sidebar from "../components/sidebar/Sidebar.tsx";

function AppLayout({ children }: { children?: ReactNode }) {
  const { ratesStatus, ratesFetchStatus, ratesError } = useCurrencyRates();

  const {
    transactions,
    transactionsStatus,
    transactionsFetchStatus,
    transactionsError,
  } = useReadTransactions();

  const { budgets, budgetsStatus, budgetsFetchStatus, budgetsError } =
    useReadBudgets();

  const { pots, potsStatus, potsFetchStatus, potsError } = useReadPots();

  const id = useStore(modalStore, (s) => s.id);

  const isLoading =
    ratesStatus === "pending" ||
    transactionsStatus === "pending" ||
    budgetsStatus === "pending" ||
    potsStatus === "pending" ||
    ratesFetchStatus !== "idle" ||
    transactionsFetchStatus !== "idle" ||
    budgetsFetchStatus !== "idle" ||
    potsFetchStatus !== "idle";

  const isError =
    ratesStatus === "error" ||
    transactionsStatus === "error" ||
    budgetsStatus === "error" ||
    potsStatus === "error";

  const error = ratesError || transactionsError || budgetsError || potsError;

  if (isError) throw new Error(error?.message);

  if (!isLoading && !isError) {
    setTransactionCache(transactions);

    setBudgetCache(budgets, transactions);

    setPotCache(pots, transactions);
  }

  return (
    <div className="flex h-screen max-h-screen min-h-screen overflow-hidden">
      <Sidebar />

      {id && ["action_not_allowed"].includes(id) && (
        <ModalLayout>
          {id === "action_not_allowed" && <ActionNotAllowedModal />}
        </ModalLayout>
      )}

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
