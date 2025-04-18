import { createFileRoute, Navigate } from "@tanstack/react-router";

import ErrorPage from "../../pages/ErrorPage.tsx";
import PageNotFound from "../../pages/PageNotFound.tsx";

import { Route as loginRoute } from "./login.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/auth/")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
  notFoundComponent: PageNotFound,
  errorComponent: ErrorPage,
});

function RouteComponent() {
  return <Navigate to={loginRoute.to} replace={true} />;
}

export { Route };
