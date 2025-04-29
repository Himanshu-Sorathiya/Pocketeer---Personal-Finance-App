import { useStore } from "@tanstack/react-store";

import { potStore } from "../store/potStore.ts";

import { useDeletePot } from "../hooks/useDeletePot.ts";

import CancelButton from "../../../components/buttons/CancelButton.tsx";
import DeleteButton from "../../../components/buttons/DeleteButton.tsx";
import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

import type { Pot } from "../types/pot.types.ts";

function DeletePotModal({ potId }: { potId: string }) {
  const pots: Pot[] = useStore(potStore, (s) => s.pots);

  const { potStatus, deletePot } = useDeletePot();

  const pot: Pot | undefined = pots.find((pot) => pot.potId === potId);

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {potStatus === "pending" && <FormSpinner />}

      <ModalHeader title={`Delete "${pot?.name}" Pot?`} />

      <ModalDescription description="Decided to close this savings pot? Deleting it will remove all associated progress, so make sure it’s the right move for your journey with Pocketeer!" />

      <DeleteButton label="Yes, Delete" onClick={() => deletePot(potId)} />

      <CancelButton label="Cancel" />
    </div>
  );
}

export default DeletePotModal;
