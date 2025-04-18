import { useStore } from "@tanstack/react-store";

import { potStore } from "../store/potStore.ts";

import CancelButton from "../../../components/buttons/CancelButton.tsx";
import DeleteButton from "../../../components/buttons/DeleteButton.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

function DeletePotModal({ potId }: { potId: string }) {
  const pot = [...useStore(potStore, (s) => s.pots)].find(
    (pot) => pot.id === potId,
  );

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <ModalHeader title={`Delete "${pot?.name}" Pot?`} />

      <ModalDescription description="Decided to close this savings pot? Deleting it will remove all associated progress, so make sure it’s the right move for your journey with Pocketeer!" />

      <DeleteButton label="Yes, Delete" />

      <CancelButton label="Cancel" />
    </div>
  );
}

export default DeletePotModal;
