import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

import AuthLayout from "../../layouts/AuthLayout.tsx";

import ErrorPage from "../../pages/common/ErrorPage.tsx";
import NotFoundPage from "../../pages/common/NotFoundPage.tsx";

import { useUser } from "../../features/auth/hooks/useUser.ts";

import { Route as dashboardRoute } from "../app/dashboard.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
});

function RouteComponent() {
  const { userStatus, userFetchStatus, isAuthenticated } = useUser();

  const isLoading = userStatus === "pending" && userFetchStatus !== "idle";

  if (isLoading) return <GlobalSpinner />;

  if (!isLoading && isAuthenticated) return <Navigate to={dashboardRoute.to} />;

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
