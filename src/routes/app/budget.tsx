import { createFileRoute, useRouterState } from '@tanstack/react-router';

import AppLayout from "../../layouts/AppLayout.tsx";

import Budget from "../../pages/Budget.tsx";

import GlobalSpinner from "../../components/spinners/GlobalSpinner.tsx";

const Route = createFileRoute("/app/budget")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  const { status } = useRouterState();

  return (
    <AppLayout>
      {status === "pending" && <GlobalSpinner />}

      <Budget />
    </AppLayout>
  );
}

export { Route };
