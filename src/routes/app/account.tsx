import { createFileRoute } from "@tanstack/react-router";

import Account from "../../pages/app/Account.tsx";
import ErrorPage from "../../pages/common/ErrorPage.tsx";
import NotFoundPage from "../../pages/common/NotFoundPage.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/account")({
  component: Account,
  pendingComponent: GlobalSpinner,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
});

export { Route };
