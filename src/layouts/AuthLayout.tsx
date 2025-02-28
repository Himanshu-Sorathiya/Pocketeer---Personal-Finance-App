import type { ReactNode } from "react";

function AuthLayout({ children }: { children?: ReactNode }) {
  return (
    <div>
      <div>Auth Layout</div>

      <div>{children}</div>
    </div>
  );
}

export default AuthLayout;
