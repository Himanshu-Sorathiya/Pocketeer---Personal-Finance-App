import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";

import { routeTree } from "./routeTree.gen.ts";

import ErrorPage from "./pages/common/ErrorPage.tsx";
import NotFoundPage from "./pages/common/NotFoundPage.tsx";

import { transactionStore } from "./features/transaction/store/transactionStore.ts";
import { setBudgetCache, setPotCache } from "./store/appCacheStore.ts";

import { getBudgets } from "./features/budget/data/budget_data.ts";
import { getPots } from "./features/pot/data/pot_data.ts";

import GlobalSpinner from "./components/loaders/GlobalSpinner.tsx";

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
  const transactions = [...useStore(transactionStore, (s) => s.transactions)];

  getBudgets().forEach((b) =>
    setBudgetCache(b.id, b.category, b.creationDate, transactions),
  );
  getPots().forEach((p) =>
    setPotCache(p.id, p.name, p.creationDate, transactions),
  );

  return <RouterProvider router={router} />;
}

export default App;
