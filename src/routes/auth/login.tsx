import { createFileRoute } from "@tanstack/react-router";

import ErrorPage from "../../pages/ErrorPage.tsx";
import Login from "../../pages/Login.tsx";
import PageNotFound from "../../pages/PageNotFound.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/auth/login")({
  component: Login,
  pendingComponent: GlobalSpinner,
  notFoundComponent: PageNotFound,
  errorComponent: ErrorPage,
});

export { Route };
