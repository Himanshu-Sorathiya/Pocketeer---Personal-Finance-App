import { createFileRoute } from "@tanstack/react-router";

import AuthLayout from "../../layouts/AuthLayout.tsx";

import Signup from "../../pages/Signup.tsx";

const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <Signup />
    </AuthLayout>
  );
}

export { Route };
