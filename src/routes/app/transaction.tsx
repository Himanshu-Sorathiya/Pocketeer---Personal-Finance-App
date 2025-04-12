import { createFileRoute } from "@tanstack/react-router";

import Transaction from "../../pages/Transaction.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/transaction")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return <Transaction />;
}

export { Route };
