import { createFileRoute } from "@tanstack/react-router";

import ErrorPage from "../../pages/ErrorPage.tsx";
import PageNotFound from "../../pages/PageNotFound.tsx";
import Pot from "../../pages/Pot.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/pot")({
  component: Pot,
  pendingComponent: GlobalSpinner,
  notFoundComponent: PageNotFound,
  errorComponent: ErrorPage,
});

export { Route };
