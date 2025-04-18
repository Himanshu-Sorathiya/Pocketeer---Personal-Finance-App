import { createFileRoute, Outlet } from "@tanstack/react-router";

import AuthLayout from "../../layouts/AuthLayout.tsx";

import ErrorPage from "../../pages/ErrorPage.tsx";
import PageNotFound from "../../pages/PageNotFound.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
  notFoundComponent: PageNotFound,
  errorComponent: ErrorPage,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
