import { type ReactNode } from "react";

import { Link } from "@tanstack/react-router";

import { Route as loginRoute } from "../routes/auth/login";
import { Route as signupRoute } from "../routes/auth/signup";

function AuthLayout({ children }: { children?: ReactNode }) {
  return (
    <div>
      <div>Auth Layout</div>

      <nav className="flex gap-4">
        <Link
          to={loginRoute.to}
          activeProps={{ className: "active" }}
          inactiveProps={{ className: "inactive" }}
        >
          Login
        </Link>

        <Link
          to={signupRoute.to}
          activeProps={{ className: "active" }}
          inactiveProps={{ className: "inactive" }}
        >
          Signup
        </Link>
      </nav>

      <div>{children}</div>
    </div>
  );
}

export default AuthLayout;
