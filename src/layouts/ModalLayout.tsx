import { ReactNode } from "react";

import { handleCloseModal } from "../store/appModalStore.ts";

import CloseButton from "../components/buttons/CloseButton.tsx";

function ModalLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleCloseModal}
    >
      <div
        className="relative max-h-screen w-full max-w-xl overflow-y-visible rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        <CloseButton onClick={handleCloseModal} />
      </div>
    </div>
  );
}

export default ModalLayout;
