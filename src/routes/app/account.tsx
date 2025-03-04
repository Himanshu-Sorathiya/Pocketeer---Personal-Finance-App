import { createFileRoute } from "@tanstack/react-router";

import AppLayout from "../../layouts/AppLayout.tsx";

import Account from "../../pages/Account.tsx";

const Route = createFileRoute("/app/account")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Account />
    </AppLayout>
  );
}

export { Route };
