import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import ErrorPage from "./pages/common/ErrorPage.tsx";
import NotFoundPage from "./pages/common/NotFoundPage.tsx";

import { routeTree } from "./services/routeTree.gen.ts";

import GlobalSpinner from "./components/loaders/GlobalSpinner.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
    },
  },
});

const router = createRouter({
  routeTree,

  defaultPreload: "intent",
  defaultPreloadDelay: 100,

  scrollRestoration: true,
  scrollRestorationBehavior: "smooth",

  defaultPendingComponent: GlobalSpinner,
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ErrorPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
