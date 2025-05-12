import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ToastContainer, Zoom } from "react-toastify";

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

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={false}
        pauseOnHover={true}
        theme="light"
        transition={Zoom}
        toastClassName={() =>
          "relative min-w-md max-w-md m-2 rounded-lg bg-white p-6 shadow-lg"
        }
        icon={false}
      />

      <TanStackRouterDevtools initialIsOpen={false} />

      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export { Route };
