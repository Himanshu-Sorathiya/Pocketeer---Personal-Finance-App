import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "../../layouts/AppLayout.tsx";
import Budget from "../../pages/Budget.tsx";

export const Route = createFileRoute("/app/budget")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Budget />
    </AppLayout>
  );
}
