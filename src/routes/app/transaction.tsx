import { createFileRoute } from "@tanstack/react-router";

import AppLayout from "../../layouts/AppLayout.tsx";

import Transaction from "../../pages/Transaction.tsx";

const Route = createFileRoute("/app/transaction")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Transaction />
    </AppLayout>
  );
}

export { Route };
