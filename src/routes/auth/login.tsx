import { createFileRoute, useRouterState } from '@tanstack/react-router';

import AuthLayout from "../../layouts/AuthLayout.tsx";

import Login from "../../pages/Login.tsx";

import GlobalSpinner from "../../components/spinners/GlobalSpinner.tsx";

const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  const { status } = useRouterState();

  return (
    <AuthLayout>
      {status === "pending" ? <GlobalSpinner /> : <Login />}
    </AuthLayout>
  );
}

export { Route };
