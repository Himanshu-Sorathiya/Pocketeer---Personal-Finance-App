import { createFileRoute, Outlet } from "@tanstack/react-router";

import AppLayout from "../../layouts/AppLayout.tsx";

import ErrorPage from "../../pages/common/ErrorPage.tsx";
import NotFoundPage from "../../pages/common/NotFoundPage.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
