import { createFileRoute } from "@tanstack/react-router";

import Budget from "../../pages/Budget.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/budget")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return <Budget />;
}

export { Route };
