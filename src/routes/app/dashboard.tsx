import { createFileRoute, useRouterState } from '@tanstack/react-router';

import AppLayout from "../../layouts/AppLayout.tsx";

import Dashboard from "../../pages/Dashboard.tsx";

import GlobalSpinner from "../../components/spinners/GlobalSpinner.tsx";

const Route = createFileRoute("/app/dashboard")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  const { status } = useRouterState();

  return (
    <AppLayout>
      {status === "pending" && <GlobalSpinner />}

      <Dashboard />
    </AppLayout>
  );
}

export { Route };
