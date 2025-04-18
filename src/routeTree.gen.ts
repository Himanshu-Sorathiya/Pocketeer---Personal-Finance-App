/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root.tsx";
import { Route as AppAccountImport } from "./routes/app/account.tsx";
import { Route as AppBudgetImport } from "./routes/app/budget.tsx";
import { Route as AppDashboardImport } from "./routes/app/dashboard.tsx";
import { Route as AppIndexImport } from "./routes/app/index.tsx";
import { Route as AppNotificationImport } from "./routes/app/notification.tsx";
import { Route as AppPotImport } from "./routes/app/pot.tsx";
import { Route as AppRouteImport } from "./routes/app/route.tsx";
import { Route as AppTransactionImport } from "./routes/app/transaction.tsx";
import { Route as AuthIndexImport } from "./routes/auth/index.tsx";
import { Route as AuthLoginImport } from "./routes/auth/login.tsx";
import { Route as AuthRouteImport } from "./routes/auth/route.tsx";
import { Route as AuthSignupImport } from "./routes/auth/signup.tsx";
import { Route as IndexImport } from "./routes/index.tsx";

// Create/Update Routes

const AuthRouteRoute = AuthRouteImport.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => rootRoute,
} as any);

const AppRouteRoute = AppRouteImport.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const AuthIndexRoute = AuthIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthRouteRoute,
} as any);

const AppIndexRoute = AppIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppRouteRoute,
} as any);

const AuthSignupRoute = AuthSignupImport.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => AuthRouteRoute,
} as any);

const AuthLoginRoute = AuthLoginImport.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => AuthRouteRoute,
} as any);

const AppTransactionRoute = AppTransactionImport.update({
  id: "/transaction",
  path: "/transaction",
  getParentRoute: () => AppRouteRoute,
} as any);

const AppPotRoute = AppPotImport.update({
  id: "/pot",
  path: "/pot",
  getParentRoute: () => AppRouteRoute,
} as any);

const AppNotificationRoute = AppNotificationImport.update({
  id: "/notification",
  path: "/notification",
  getParentRoute: () => AppRouteRoute,
} as any);

const AppDashboardRoute = AppDashboardImport.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AppRouteRoute,
} as any);

const AppBudgetRoute = AppBudgetImport.update({
  id: "/budget",
  path: "/budget",
  getParentRoute: () => AppRouteRoute,
} as any);

const AppAccountRoute = AppAccountImport.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => AppRouteRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/app": {
      id: "/app";
      path: "/app";
      fullPath: "/app";
      preLoaderRoute: typeof AppRouteImport;
      parentRoute: typeof rootRoute;
    };
    "/auth": {
      id: "/auth";
      path: "/auth";
      fullPath: "/auth";
      preLoaderRoute: typeof AuthRouteImport;
      parentRoute: typeof rootRoute;
    };
    "/app/account": {
      id: "/app/account";
      path: "/account";
      fullPath: "/app/account";
      preLoaderRoute: typeof AppAccountImport;
      parentRoute: typeof AppRouteImport;
    };
    "/app/budget": {
      id: "/app/budget";
      path: "/budget";
      fullPath: "/app/budget";
      preLoaderRoute: typeof AppBudgetImport;
      parentRoute: typeof AppRouteImport;
    };
    "/app/dashboard": {
      id: "/app/dashboard";
      path: "/dashboard";
      fullPath: "/app/dashboard";
      preLoaderRoute: typeof AppDashboardImport;
      parentRoute: typeof AppRouteImport;
    };
    "/app/notification": {
      id: "/app/notification";
      path: "/notification";
      fullPath: "/app/notification";
      preLoaderRoute: typeof AppNotificationImport;
      parentRoute: typeof AppRouteImport;
    };
    "/app/pot": {
      id: "/app/pot";
      path: "/pot";
      fullPath: "/app/pot";
      preLoaderRoute: typeof AppPotImport;
      parentRoute: typeof AppRouteImport;
    };
    "/app/transaction": {
      id: "/app/transaction";
      path: "/transaction";
      fullPath: "/app/transaction";
      preLoaderRoute: typeof AppTransactionImport;
      parentRoute: typeof AppRouteImport;
    };
    "/auth/login": {
      id: "/auth/login";
      path: "/login";
      fullPath: "/auth/login";
      preLoaderRoute: typeof AuthLoginImport;
      parentRoute: typeof AuthRouteImport;
    };
    "/auth/signup": {
      id: "/auth/signup";
      path: "/signup";
      fullPath: "/auth/signup";
      preLoaderRoute: typeof AuthSignupImport;
      parentRoute: typeof AuthRouteImport;
    };
    "/app/": {
      id: "/app/";
      path: "/";
      fullPath: "/app/";
      preLoaderRoute: typeof AppIndexImport;
      parentRoute: typeof AppRouteImport;
    };
    "/auth/": {
      id: "/auth/";
      path: "/";
      fullPath: "/auth/";
      preLoaderRoute: typeof AuthIndexImport;
      parentRoute: typeof AuthRouteImport;
    };
  }
}

// Create and export the route tree

interface AppRouteRouteChildren {
  AppAccountRoute: typeof AppAccountRoute;
  AppBudgetRoute: typeof AppBudgetRoute;
  AppDashboardRoute: typeof AppDashboardRoute;
  AppNotificationRoute: typeof AppNotificationRoute;
  AppPotRoute: typeof AppPotRoute;
  AppTransactionRoute: typeof AppTransactionRoute;
  AppIndexRoute: typeof AppIndexRoute;
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppAccountRoute: AppAccountRoute,
  AppBudgetRoute: AppBudgetRoute,
  AppDashboardRoute: AppDashboardRoute,
  AppNotificationRoute: AppNotificationRoute,
  AppPotRoute: AppPotRoute,
  AppTransactionRoute: AppTransactionRoute,
  AppIndexRoute: AppIndexRoute,
};

const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren,
);

interface AuthRouteRouteChildren {
  AuthLoginRoute: typeof AuthLoginRoute;
  AuthSignupRoute: typeof AuthSignupRoute;
  AuthIndexRoute: typeof AuthIndexRoute;
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthLoginRoute: AuthLoginRoute,
  AuthSignupRoute: AuthSignupRoute,
  AuthIndexRoute: AuthIndexRoute,
};

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/app": typeof AppRouteRouteWithChildren;
  "/auth": typeof AuthRouteRouteWithChildren;
  "/app/account": typeof AppAccountRoute;
  "/app/budget": typeof AppBudgetRoute;
  "/app/dashboard": typeof AppDashboardRoute;
  "/app/notification": typeof AppNotificationRoute;
  "/app/pot": typeof AppPotRoute;
  "/app/transaction": typeof AppTransactionRoute;
  "/auth/login": typeof AuthLoginRoute;
  "/auth/signup": typeof AuthSignupRoute;
  "/app/": typeof AppIndexRoute;
  "/auth/": typeof AuthIndexRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/app/account": typeof AppAccountRoute;
  "/app/budget": typeof AppBudgetRoute;
  "/app/dashboard": typeof AppDashboardRoute;
  "/app/notification": typeof AppNotificationRoute;
  "/app/pot": typeof AppPotRoute;
  "/app/transaction": typeof AppTransactionRoute;
  "/auth/login": typeof AuthLoginRoute;
  "/auth/signup": typeof AuthSignupRoute;
  "/app": typeof AppIndexRoute;
  "/auth": typeof AuthIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/app": typeof AppRouteRouteWithChildren;
  "/auth": typeof AuthRouteRouteWithChildren;
  "/app/account": typeof AppAccountRoute;
  "/app/budget": typeof AppBudgetRoute;
  "/app/dashboard": typeof AppDashboardRoute;
  "/app/notification": typeof AppNotificationRoute;
  "/app/pot": typeof AppPotRoute;
  "/app/transaction": typeof AppTransactionRoute;
  "/auth/login": typeof AuthLoginRoute;
  "/auth/signup": typeof AuthSignupRoute;
  "/app/": typeof AppIndexRoute;
  "/auth/": typeof AuthIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/app"
    | "/auth"
    | "/app/account"
    | "/app/budget"
    | "/app/dashboard"
    | "/app/notification"
    | "/app/pot"
    | "/app/transaction"
    | "/auth/login"
    | "/auth/signup"
    | "/app/"
    | "/auth/";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | "/app/account"
    | "/app/budget"
    | "/app/dashboard"
    | "/app/notification"
    | "/app/pot"
    | "/app/transaction"
    | "/auth/login"
    | "/auth/signup"
    | "/app"
    | "/auth";
  id:
    | "__root__"
    | "/"
    | "/app"
    | "/auth"
    | "/app/account"
    | "/app/budget"
    | "/app/dashboard"
    | "/app/notification"
    | "/app/pot"
    | "/app/transaction"
    | "/auth/login"
    | "/auth/signup"
    | "/app/"
    | "/auth/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  AppRouteRoute: typeof AppRouteRouteWithChildren;
  AuthRouteRoute: typeof AuthRouteRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AppRouteRoute: AppRouteRouteWithChildren,
  AuthRouteRoute: AuthRouteRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/app",
        "/auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/app": {
      "filePath": "app/route.tsx",
      "children": [
        "/app/account",
        "/app/budget",
        "/app/dashboard",
        "/app/notification",
        "/app/pot",
        "/app/transaction",
        "/app/"
      ]
    },
    "/auth": {
      "filePath": "auth/route.tsx",
      "children": [
        "/auth/login",
        "/auth/signup",
        "/auth/"
      ]
    },
    "/app/account": {
      "filePath": "app/account.tsx",
      "parent": "/app"
    },
    "/app/budget": {
      "filePath": "app/budget.tsx",
      "parent": "/app"
    },
    "/app/dashboard": {
      "filePath": "app/dashboard.tsx",
      "parent": "/app"
    },
    "/app/notification": {
      "filePath": "app/notification.tsx",
      "parent": "/app"
    },
    "/app/pot": {
      "filePath": "app/pot.tsx",
      "parent": "/app"
    },
    "/app/transaction": {
      "filePath": "app/transaction.tsx",
      "parent": "/app"
    },
    "/auth/login": {
      "filePath": "auth/login.tsx",
      "parent": "/auth"
    },
    "/auth/signup": {
      "filePath": "auth/signup.tsx",
      "parent": "/auth"
    },
    "/app/": {
      "filePath": "app/index.tsx",
      "parent": "/app"
    },
    "/auth/": {
      "filePath": "auth/index.tsx",
      "parent": "/auth"
    }
  }
}
ROUTE_MANIFEST_END */
