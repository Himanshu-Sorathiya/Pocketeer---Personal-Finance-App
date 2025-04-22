import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";

import { routeTree } from "./routeTree.gen.ts";

import ErrorPage from "./pages/common/ErrorPage.tsx";
import NotFoundPage from "./pages/common/NotFoundPage.tsx";

import { budgetStore } from "./features/budget/store/budgetStore.ts";
import { potStore } from "./features/pot/store/potStore.ts";
import { transactionStore } from "./features/transaction/store/transactionStore.ts";
import {
  setBudgetCache,
  setPotCache,
  setTransactionCache,
} from "./store/appCacheStore.ts";

import GlobalSpinner from "./components/loaders/GlobalSpinner.tsx";

import type { Budget } from "./features/budget/types/budget.types.ts";
import type { Pot } from "./features/pot/types/pot.types.ts";
import type { Transaction } from "./features/transaction/types/transaction.types.ts";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadDelay: 100,
  scrollRestoration: true,
  scrollRestorationBehavior: "smooth",
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ErrorPage,
  defaultPendingComponent: GlobalSpinner,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const transactions: Transaction[] = [
    ...useStore(transactionStore, (s) => s.transactions),
  ];
  const budgets: Budget[] = [...useStore(budgetStore, (s) => s.budgets)];
  const pots: Pot[] = [...useStore(potStore, (s) => s.pots)];

  transactions.forEach((transaction) => {
    setTransactionCache(transaction.transactionId, transaction.category);
  });

  budgets.forEach((b) =>
    setBudgetCache(b.budgetId, b.category, b.creationDate, transactions),
  );

  pots.forEach((p) =>
    setPotCache(p.potId, p.name, p.creationDate, transactions),
  );

  return <RouterProvider router={router} />;
}

export default App;
