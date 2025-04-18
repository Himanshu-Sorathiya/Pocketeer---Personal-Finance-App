import { createFileRoute, Outlet } from "@tanstack/react-router";

import AuthLayout from "../../layouts/AuthLayout.tsx";

import ErrorPage from "../../pages/common/ErrorPage.tsx";
import NotFoundPage from "../../pages/common/NotFoundPage.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
