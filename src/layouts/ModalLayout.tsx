import { ReactNode } from "react";

import CloseButton from "../components/buttons/CloseButton.tsx";

function ModalLayout({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-screen w-full max-w-xl overflow-y-visible rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        <CloseButton onClick={onClose} />
      </div>
    </div>
  );
}

export default ModalLayout;
