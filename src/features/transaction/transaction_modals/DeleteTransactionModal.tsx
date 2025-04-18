import { useStore } from "@tanstack/react-store";

import { transactionStore } from "../store/transactionStore.ts";

import CancelButton from "../../../components/buttons/CancelButton.tsx";
import DeleteButton from "../../../components/buttons/DeleteButton.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

function DeleteTransactionModal({ transactionId }: any) {
  const transaction = [
    ...useStore(transactionStore, (s) => s.transactions),
  ].find((transaction) => transaction.id === transactionId);

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <ModalHeader title={`Delete "${transaction?.recipient}" Transaction?`} />

      <ModalDescription description="Want to clean up your records? Deleting this transaction will remove it from your financial history in Pocketeer!." />

      <DeleteButton label="Yes, Delete" />

      <CancelButton label="Cancel" />
    </div>
  );
}

export default DeleteTransactionModal;
