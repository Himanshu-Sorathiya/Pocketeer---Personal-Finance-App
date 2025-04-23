import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import ErrorPage from "../pages/common/ErrorPage.tsx";
import NotFoundPage from "../pages/common/NotFoundPage.tsx";

import FlowLoader from "../components/loaders/FlowLoader.tsx";
import GlobalSpinner from "../components/loaders/GlobalSpinner.tsx";

const Route = createRootRoute({
  component: RootComponent,
  pendingComponent: GlobalSpinner,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
});

function RootComponent() {
  const { status } = useRouterState();

  return (
    <>
      {status === "pending" && <FlowLoader />}

      <Outlet />

      <TanStackRouterDevtools initialIsOpen={false} />

      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export { Route };
