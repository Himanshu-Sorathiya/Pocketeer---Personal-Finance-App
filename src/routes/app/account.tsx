import { createFileRoute, useRouterState } from "@tanstack/react-router";

import AppLayout from "../../layouts/AppLayout.tsx";

import Account from "../../pages/Account.tsx";

import GlobalSpinner from "../../components/spinners/GlobalSpinner.tsx";

const Route = createFileRoute("/app/account")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  const { status } = useRouterState();

  return (
    <AppLayout>
      {status === "pending" && <GlobalSpinner />}
      
      <Account />
    </AppLayout>
  );
}

export { Route };
