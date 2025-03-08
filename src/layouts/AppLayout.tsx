import { type ReactNode } from "react";

import Sidebar from "../components/sidebar/Sidebar.tsx";

function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-orange-50 p-8">{children}</div>
    </div>
  );
}

export default AppLayout;
