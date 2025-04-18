import { createFileRoute } from "@tanstack/react-router";

import ErrorPage from "../../pages/ErrorPage.tsx";
import PageNotFound from "../../pages/PageNotFound.tsx";
import Transaction from "../../pages/Transaction.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/transaction")({
  component: Transaction,
  pendingComponent: GlobalSpinner,
  notFoundComponent: PageNotFound,
  errorComponent: ErrorPage,
});

export { Route };
