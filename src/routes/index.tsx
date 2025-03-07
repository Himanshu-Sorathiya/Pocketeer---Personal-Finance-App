import { createFileRoute, Navigate } from '@tanstack/react-router';

import { Route as dashboardRoute } from './app/dashboard.tsx';

import GlobalSpinner from "../components/spinners/GlobalSpinner.tsx";

const Route = createFileRoute("/")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return <Navigate to={dashboardRoute.to} replace={true} />;
}

export { Route };
