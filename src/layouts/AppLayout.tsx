import { type ReactNode } from "react";

import { Link } from "@tanstack/react-router";

import { Route as accountRoute } from "../routes/app/account";
import { Route as budgetRoute } from "../routes/app/budget";
import { Route as dashboardRoute } from "../routes/app/dashboard";
import { Route as notificationRoute } from "../routes/app/notification";
import { Route as potRoute } from "../routes/app/pot";
import { Route as transactionRoute } from "../routes/app/transaction";

function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <div>
      <div>App Layout</div>

      <nav className="flex gap-4">
        <Link
          to={dashboardRoute.to}
          activeOptions={{ exact: true }}
          activeProps={{ className: "active" }}
          inactiveProps={{ className: "inactive" }}
        >
          Dashboard
        </Link>

        <Link
          to={transactionRoute.to}
          activeOptions={{ exact: true }}
          activeProps={{ className: "active" }}
          inactiveProps={{ className: "inactive" }}
        >
          Transaction
        </Link>

        <Link
          to={budgetRoute.to}
          activeOptions={{ exact: true }}
          activeProps={{ className: "active" }}
          inactiveProps={{ className: "inactive" }}
        >
          Budget
        </Link>

        <Link
          to={potRoute.to}
          activeOptions={{ exact: true }}
          activeProps={{ className: "active" }}
          inactiveProps={{ className: "inactive" }}
        >
          Pot
        </Link>

        <Link
          to={notificationRoute.to}
          activeOptions={{ exact: true }}
          activeProps={{ className: "active" }}
          inactiveProps={{ className: "inactive" }}
        >
          Notification
        </Link>

        <Link
          to={accountRoute.to}
          activeOptions={{ exact: true }}
          activeProps={{ className: "active" }}
          inactiveProps={{ className: "inactive" }}
        >
          Account
        </Link>
      </nav>

      <div>{children}</div>
    </div>
  );
}

export default AppLayout;
