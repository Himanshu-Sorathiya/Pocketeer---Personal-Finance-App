import { createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen.ts";

import PageNotFound from "./pages/PageNotFound.tsx";

import GlobalSpinner from "./components/loaders/GlobalSpinner.tsx";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadDelay: 100,
  defaultNotFoundComponent: PageNotFound,
  defaultPendingComponent: GlobalSpinner,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
