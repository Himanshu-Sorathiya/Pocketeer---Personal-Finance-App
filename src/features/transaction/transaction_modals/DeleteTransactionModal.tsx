import { useDeleteTransaction } from "../hooks/useDeleteTransaction.ts";
import { useReadTransactions } from "../hooks/useReadTransactions.ts";

import CancelButton from "../../../components/buttons/CancelButton.tsx";
import DeleteButton from "../../../components/buttons/DeleteButton.tsx";
import FormSpinner from "../../../components/loaders/FormSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

import type { Transaction } from "../types/transaction.types.ts";

function DeleteTransactionModal({ transactionId }: any) {
  const { transactions } = useReadTransactions();
  const { transactionStatus, deleteTransaction } = useDeleteTransaction();

  const transaction: Transaction | undefined = transactions.find(
    (transaction) => transaction.transactionId === transactionId,
  );

  return (
    <div className="flex min-w-lg flex-col gap-3">
      {transactionStatus === "pending" && <FormSpinner />}

      <ModalHeader title={`Delete "${transaction?.recipient}" Transaction?`} />

      <ModalDescription description="Want to clean up your records? Deleting this transaction will remove it from your financial history in Pocketeer!." />

      <DeleteButton
        label="Yes, Delete"
        onClick={() => deleteTransaction(transactionId)}
      />

      <CancelButton label="Cancel" />
    </div>
  );
}

export default DeleteTransactionModal;
