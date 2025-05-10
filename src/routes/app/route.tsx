import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

import AppLayout from "../../layouts/AppLayout.tsx";

import ErrorPage from "../../pages/common/ErrorPage.tsx";
import NotFoundPage from "../../pages/common/NotFoundPage.tsx";

import { useUser } from "../../features/auth/hooks/useUser.ts";

import { Route as signInRoute } from "../auth/signin.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
});

function RouteComponent() {
  const { userStatus, userFetchStatus, isAuthenticated } = useUser();

  const isLoading = userStatus === "pending" && userFetchStatus !== "idle";

  if (isLoading) return <GlobalSpinner />;

  if (!isLoading && !isAuthenticated) return <Navigate to={signInRoute.to} />;

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
