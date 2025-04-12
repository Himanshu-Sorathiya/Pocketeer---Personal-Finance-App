import { createFileRoute } from "@tanstack/react-router";

import Account from "../../pages/Account.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/account")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  return <Account />;
}

export { Route };
