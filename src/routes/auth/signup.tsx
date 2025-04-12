import { createFileRoute } from "@tanstack/react-router";

import Signup from "../../pages/Signup.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return <Signup />;
}

export { Route };
