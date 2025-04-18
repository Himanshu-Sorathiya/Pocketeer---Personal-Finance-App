import { createFileRoute } from "@tanstack/react-router";

import Account from "../../pages/Account.tsx";
import ErrorPage from "../../pages/ErrorPage.tsx";
import PageNotFound from "../../pages/PageNotFound.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/account")({
  component: Account,
  pendingComponent: GlobalSpinner,
  notFoundComponent: PageNotFound,
  errorComponent: ErrorPage,
});

export { Route };
