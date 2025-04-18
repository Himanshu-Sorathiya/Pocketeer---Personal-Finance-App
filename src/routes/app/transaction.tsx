import { createFileRoute } from "@tanstack/react-router";

import Transaction from "../../pages/app/Transaction.tsx";
import ErrorPage from "../../pages/common/ErrorPage.tsx";
import NotFoundPage from "../../pages/common/NotFoundPage.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/transaction")({
  component: Transaction,
  pendingComponent: GlobalSpinner,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
});

export { Route };
