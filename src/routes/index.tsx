import { createFileRoute, Navigate } from "@tanstack/react-router";

import ErrorPage from "../pages/ErrorPage.tsx";
import PageNotFound from "../pages/PageNotFound.tsx";

import { Route as dashboardRoute } from "./app/dashboard.tsx";

import GlobalSpinner from "../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
  notFoundComponent: PageNotFound,
  errorComponent: ErrorPage,
});

function RouteComponent() {
  return <Navigate to={dashboardRoute.to} replace={true} />;
}

export { Route };
