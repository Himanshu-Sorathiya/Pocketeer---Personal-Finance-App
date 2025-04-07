import { useStore } from "@tanstack/react-store";

import { potStore } from "../store/potStore.ts";

import CancelButton from "../../../components/modals/CancelButton.tsx";
import DeleteButton from "../../../components/modals/DeleteButton.tsx";

function DeletePotModal({ potId }: { potId: string }) {
  const pot = [...useStore(potStore, (s) => s.pots)].find(
    (pot) => pot.id === potId,
  );

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Delete "{pot?.name}" Pot?
      </h1>

      <p className="text-text text-sm">
        Decided to close this savings pot? Deleting it will remove all
        associated progress, so make sure it’s the right move for your journey
        with Pocketeer!
      </p>

      <DeleteButton label="Yes, Delete" />

      <CancelButton label="Cancel" />
    </div>
  );
}

export default DeletePotModal;
