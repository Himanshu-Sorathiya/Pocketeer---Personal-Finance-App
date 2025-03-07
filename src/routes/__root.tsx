import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import GlobalSpinner from "../components/spinners/GlobalSpinner.tsx";

const Route = createRootRoute({
  component: RootComponent,
  pendingComponent: GlobalSpinner,
});

function RootComponent() {
  return (
    <>
      <Outlet />

      <TanStackRouterDevtools />
    </>
  );
}

export { Route };
