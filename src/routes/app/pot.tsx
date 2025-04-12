import { createFileRoute } from "@tanstack/react-router";

import Pot from "../../pages/Pot.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/pot")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return <Pot />;
}

export { Route };
