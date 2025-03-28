import { createFileRoute } from "@tanstack/react-router";

import AppLayout from "../../layouts/AppLayout.tsx";

import Notification from "../../pages/Notification.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/notification")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Notification />
    </AppLayout>
  );
}

export { Route };
