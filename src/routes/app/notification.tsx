import { createFileRoute } from "@tanstack/react-router";

import AppLayout from "../../layouts/AppLayout.tsx";

import Notification from "../../pages/Notification.tsx";

const Route = createFileRoute("/app/notification")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Notification />
    </AppLayout>
  );
}

export { Route };
