import type { ReactNode } from "react";

function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <div>
      <div>App Layout</div>

      <div>{children}</div>
    </div>
  );
}

export default AppLayout;
