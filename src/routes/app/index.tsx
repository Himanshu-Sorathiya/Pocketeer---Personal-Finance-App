import { createFileRoute, Navigate } from "@tanstack/react-router";

import { Route as dashboardRoute } from "./dashboard.tsx";

const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Navigate to={dashboardRoute.to} replace={true} />;
}

export { Route };
