import { createFileRoute } from "@tanstack/react-router";

import AppLayout from "../../layouts/AppLayout.tsx";

import Transaction from "../../pages/Transaction.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/transaction")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Transaction />
    </AppLayout>
  );
}

export { Route };
