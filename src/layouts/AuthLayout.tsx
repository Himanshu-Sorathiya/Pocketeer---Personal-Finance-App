import { type ReactNode } from "react";

function AuthLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-screen max-h-screen justify-center items-center min-h-screen overflow-hidden bg-orange-50">
      {children}
    </div>
  );
}

export default AuthLayout;
