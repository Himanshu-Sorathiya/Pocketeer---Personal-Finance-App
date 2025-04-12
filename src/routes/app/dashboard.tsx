import { createFileRoute } from "@tanstack/react-router";

import Dashboard from "../../pages/Dashboard.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/dashboard")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return <Dashboard />;
}

export { Route };
