import { createFileRoute, Navigate } from '@tanstack/react-router';

import { Route as dashboardRoute } from './dashboard.tsx';

import GlobalSpinner from "../../components/spinners/GlobalSpinner.tsx";

const Route = createFileRoute("/app/")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return <Navigate to={dashboardRoute.to} replace={true} />;
}

export { Route };
