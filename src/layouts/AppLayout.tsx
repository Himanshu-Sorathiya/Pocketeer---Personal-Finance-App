import { type ReactNode } from "react";

import Sidebar from "../components/sidebar/Sidebar.tsx";

function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1">
        <span>APP LAYOUT</span>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default AppLayout;
