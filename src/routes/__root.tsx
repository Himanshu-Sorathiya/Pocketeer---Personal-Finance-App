import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import FlowLoader from "../components/loaders/FlowLoader.tsx";
import GlobalSpinner from "../components/loaders/GlobalSpinner.tsx";

const Route = createRootRoute({
  component: RootComponent,
  pendingComponent: GlobalSpinner,
});

function RootComponent() {
  const { status } = useRouterState();

  return (
    <>
      {status === "pending" && <FlowLoader />}

      <Outlet />

      <TanStackRouterDevtools />
    </>
  );
}

export { Route };
