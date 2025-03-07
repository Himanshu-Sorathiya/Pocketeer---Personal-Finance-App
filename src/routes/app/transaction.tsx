import { createFileRoute, useRouterState } from '@tanstack/react-router';

import AppLayout from "../../layouts/AppLayout.tsx";

import Transaction from "../../pages/Transaction.tsx";

import GlobalSpinner from "../../components/spinners/GlobalSpinner.tsx";

const Route = createFileRoute("/app/transaction")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  const { status } = useRouterState();

  return (
    <AppLayout>
      {status === "pending" ? <GlobalSpinner /> : <Transaction />}
    </AppLayout>
  );
}

export { Route };
