import { createFileRoute, Outlet } from "@tanstack/react-router";

import AppLayout from "../../layouts/AppLayout.tsx";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
