import { createFileRoute } from "@tanstack/react-router";
import AuthLayout from "../../layouts/AuthLayout.tsx";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthLayout />;
}
