import { createFileRoute, Navigate } from "@tanstack/react-router";

import { Route as dashboardRoute } from "./app/dashboard.tsx";

const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Navigate to={dashboardRoute.to} replace={true} />;
}

export { Route };
