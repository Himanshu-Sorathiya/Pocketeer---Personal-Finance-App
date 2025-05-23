import type { ReactNode } from "react";

function ModalDescription({ description }: { description: ReactNode }) {
  return <p className="text-text text-sm text-pretty">{description}</p>;
}

export default ModalDescription;
