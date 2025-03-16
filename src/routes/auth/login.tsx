import { createFileRoute } from "@tanstack/react-router";

import AuthLayout from "../../layouts/AuthLayout.tsx";

import Login from "../../pages/Login.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}

export { Route };
