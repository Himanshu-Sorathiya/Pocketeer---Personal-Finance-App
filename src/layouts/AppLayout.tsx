import { type ReactNode } from "react";

import Sidebar from "../components/sidebar/Sidebar.tsx";

function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-screen max-h-screen min-h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-orange-50 p-8">{children}</div>
    </div>
  );
}

export default AppLayout;
