import { useStore } from "@tanstack/react-store";

import { transactionStore } from "../store/transactionStore.ts";

import CancelButton from "../../../components/buttons/CancelButton.tsx";
import DeleteButton from "../../../components/buttons/DeleteButton.tsx";

function DeleteTransactionModal({ transactionId }: any) {
  const transaction = [
    ...useStore(transactionStore, (s) => s.transactions),
  ].find((transaction) => transaction.id === transactionId);

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Delete "{transaction?.recipient}" Transaction?
      </h1>

      <p className="text-text text-sm">
        Want to clean up your records? Deleting this transaction will remove it
        from your financial history in Pocketeer!.
      </p>

      <DeleteButton label="Yes, Delete" />

      <CancelButton label="Cancel" />
    </div>
  );
}

export default DeleteTransactionModal;
