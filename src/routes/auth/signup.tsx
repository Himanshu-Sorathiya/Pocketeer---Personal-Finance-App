import { createFileRoute, useRouterState } from '@tanstack/react-router';

import AuthLayout from "../../layouts/AuthLayout.tsx";

import Signup from "../../pages/Signup.tsx";

import GlobalSpinner from "../../components/spinners/GlobalSpinner.tsx";

const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
  pendingComponent: GlobalSpinner,
});

function RouteComponent() {
  const { status } = useRouterState();

  return (
    <AuthLayout>
      {status === "pending" ? <GlobalSpinner /> : <Signup />}
    </AuthLayout>
  );
}

export { Route };
