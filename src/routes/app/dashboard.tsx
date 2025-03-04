import { createFileRoute } from "@tanstack/react-router";

import AppLayout from "../../layouts/AppLayout.tsx";

import Dashboard from "../../pages/Dashboard.tsx";

const Route = createFileRoute("/app/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
}

export { Route };
