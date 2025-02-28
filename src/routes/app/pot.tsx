import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "../../layouts/AppLayout.tsx";
import Pot from "../../pages/Pot.tsx";

export const Route = createFileRoute("/app/pot")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Pot />
    </AppLayout>
  );
}
