import { createFileRoute } from "@tanstack/react-router";

import AuthLayout from "../../layouts/AuthLayout.tsx";

import Login from "../../pages/Login.tsx";

const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}

export { Route };
