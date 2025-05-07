import { useStore } from "@tanstack/react-store";

import { potTransactionCacheStore } from "../../../store/appCacheStore.ts";

import { useDeletePot } from "../hooks/useDeletePot.ts";
import { useReadPots } from "../hooks/useReadPots.ts";

import CancelButton from "../../../components/buttons/CancelButton.tsx";
import DeleteButton from "../../../components/buttons/DeleteButton.tsx";
import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";
import TooltipInfo from "../../../components/ui/Tooltip.tsx";

import type { Transaction } from "../../transaction/types/transaction.types.ts";
import type { Pot } from "../types/pot.types.ts";

function DeletePotModal({ potId }: { potId: string }) {
  const { pots } = useReadPots();
  const { potStatus, deletePot } = useDeletePot();

  const transactionsMap = useStore(potTransactionCacheStore);
  const transactions: Transaction[] =
    transactionsMap.get(potId)?.transactions ?? [];

  const transactionIds = transactions.map((t) => t.transactionId);

  const pot: Pot | undefined = pots.find((pot) => pot.potId === potId);

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {potStatus === "pending" && <FormSpinner />}

      <ModalHeader title={`Delete "${pot?.name}" Pot?`}>
        <TooltipInfo
          id="info-circle"
          text1="Deleting this Pot will also remove all Transactions related to adding or withdrawing money from this pot."
          className="text-primary size-5"
        />
      </ModalHeader>

      <ModalDescription description="Decided to close this savings pot? Deleting it will remove all associated progress, so make sure it’s the right move for your journey with Pocketeer!" />

      <DeleteButton
        label="Yes, Delete"
        onClick={() => deletePot({ potId, transactionIds })}
      />

      <CancelButton label="Cancel" />
    </div>
  );
}

export default DeletePotModal;
