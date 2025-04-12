import { createFileRoute } from "@tanstack/react-router";

import Login from "../../pages/Login.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return <Login />;
}

export { Route };
