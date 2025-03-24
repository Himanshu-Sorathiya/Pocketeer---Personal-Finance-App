import { type ReactNode } from "react";

function ErrorLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 overflow-hidden bg-orange-50">
      {children}
    </div>
  );
}

export default ErrorLayout;
