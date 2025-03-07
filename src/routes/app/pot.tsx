import { createFileRoute, useRouterState } from '@tanstack/react-router';

import AppLayout from "../../layouts/AppLayout.tsx";

import Pot from "../../pages/Pot.tsx";

import GlobalSpinner from "../../components/spinners/GlobalSpinner.tsx";

const Route = createFileRoute("/app/pot")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  const { status } = useRouterState();

  return (
    <AppLayout>{status === "pending" ? <GlobalSpinner /> : <Pot />}</AppLayout>
  );
}

export { Route };
