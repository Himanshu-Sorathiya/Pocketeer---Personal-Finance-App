import { Link, useMatchRoute } from '@tanstack/react-router';

import { Route as accountRoute } from '../../routes/app/account.tsx';
import { Route as budgetRoute } from '../../routes/app/budget.tsx';
import { Route as dashboardRoute } from '../../routes/app/dashboard.tsx';
import { Route as notificationRoute } from '../../routes/app/notification.tsx';
import { Route as potRoute } from '../../routes/app/pot.tsx';
import { Route as transactionRoute } from '../../routes/app/transaction.tsx';

function SidebarNav() {
  return (
    <nav className="divide-y divide-gray-700">
      <ul className="space-y-1 pt-2 pb-4 text-sm">
        <SidebarLink
          to={dashboardRoute.to}
          icon="dashboard"
          label="Dashboard"
        />

        <SidebarLink
          to={transactionRoute.to}
          icon="transaction"
          label="Transaction"
        />

        <SidebarLink to={budgetRoute.to} icon="budget" label="Budget" />

        <SidebarLink to={potRoute.to} icon="pot" label="Pot" />
      </ul>

      <ul className="space-y-1 pt-4 pb-2 text-sm">
        <SidebarLink to={accountRoute.to} icon="profile" label="Account" />

        <SidebarLink
          to={notificationRoute.to}
          icon="bell"
          label="Notification"
        />

        <li className={`rounded-md`}>
          <a className="flex items-center space-x-3 rounded-md p-3 hover:bg-gray-800">
            <svg className="h-6 w-6">
              <use href="/src/assets/icons/ui_icons_sprite.svg#logout" />
            </svg>

            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

function SidebarLink({
  to,
  icon,
  label,
}: {
  to: string;
  icon: string;
  label: string;
}) {
  const matchRoute = useMatchRoute();
  const isActive = matchRoute({ to, fuzzy: false });

  return (
    <li className="rounded-md">
      <Link
        to={to}
        className={`flex items-center space-x-3 rounded-md p-3 hover:bg-gray-800 ${
          isActive ? "bg-gray-800" : "text-gray-50"
        }`}
      >
        <svg className={`h-6 w-6 ${isActive && "text-primary"}`}>
          <use href={`/src/assets/icons/ui_icons_sprite.svg#${icon}`} />
        </svg>

        <span className={`${isActive && "text-primary"}`}>{label}</span>
      </Link>
    </li>
  );
}

export default SidebarNav;
