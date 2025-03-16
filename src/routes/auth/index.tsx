import { createFileRoute, Navigate } from "@tanstack/react-router";

import { Route as loginRoute } from "./login.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/auth/")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return <Navigate to={loginRoute.to} replace={true} />;
}

export { Route };
