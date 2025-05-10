import { createFileRoute, Navigate } from "@tanstack/react-router";

import ErrorPage from "../pages/common/ErrorPage.tsx";
import NotFoundPage from "../pages/common/NotFoundPage.tsx";

import { Route as appRoute } from "./app/index.tsx";

import GlobalSpinner from "../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
});

function RouteComponent() {
  return <Navigate to={appRoute.to} replace={true} />;
}

export { Route };

