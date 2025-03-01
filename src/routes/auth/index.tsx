import { createFileRoute, Navigate } from "@tanstack/react-router";

import { Route as loginRoute } from "./login.tsx";

const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Navigate to={loginRoute.to} replace={true} />;
}

export { Route };
