import { createFileRoute, useRouterState } from '@tanstack/react-router';

import AppLayout from "../../layouts/AppLayout.tsx";

import Notification from "../../pages/Notification.tsx";

import GlobalSpinner from "../../components/spinners/GlobalSpinner.tsx";

const Route = createFileRoute("/app/notification")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  const { status } = useRouterState();

  return (
    <AppLayout>
      {status === "pending" ? <GlobalSpinner /> : <Notification />}
    </AppLayout>
  );
}

export { Route };
