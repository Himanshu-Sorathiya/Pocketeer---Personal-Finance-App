import { createFileRoute } from "@tanstack/react-router";

import ErrorPage from "../../pages/ErrorPage.tsx";
import Notification from "../../pages/Notification.tsx";
import PageNotFound from "../../pages/PageNotFound.tsx";

import GlobalSpinner from "../../components/loaders/GlobalSpinner.tsx";

const Route = createFileRoute("/app/notification")({
  component: Notification,
  pendingComponent: GlobalSpinner,
  notFoundComponent: PageNotFound,
  errorComponent: ErrorPage,
});

export { Route };
