import { usePots } from "../../../hooks/usePots.ts";

import CancelButton from "../../../components/buttons/CancelButton.tsx";
import DeleteButton from "../../../components/buttons/DeleteButton.tsx";
import GlobalSpinner from "../../../components/loaders/GlobalSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

import type { Pot } from "../types/pot.types.ts";

function DeletePotModal({ potId }: { potId: string }) {
  const { pots, isLoading, isError, error } = usePots();

  if (isLoading) return <GlobalSpinner />;

  if (isError) throw new Error(error?.message);

  const pot: Pot | undefined = pots!.find((pot) => pot.potId === potId);

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
