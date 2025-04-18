import { createFileRoute } from "@tanstack/react-router";

import Budget from "../../pages/Budget.tsx";
import ErrorPage from "../../pages/ErrorPage.tsx";
import PageNotFound from "../../pages/PageNotFound.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/budget")({
  component: Budget,
  pendingComponent: GlobalSpinner,
  notFoundComponent: PageNotFound,
  errorComponent: ErrorPage,
});

export { Route };
