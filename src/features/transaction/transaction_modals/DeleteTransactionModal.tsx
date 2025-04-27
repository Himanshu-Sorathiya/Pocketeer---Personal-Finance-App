import CancelButton from "../../../components/buttons/CancelButton.tsx";
import DeleteButton from "../../../components/buttons/DeleteButton.tsx";
import GlobalSpinner from "../../../components/loaders/GlobalSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";
import { useTransactions } from "../../../hooks/useTransactions.ts";
import type { Transaction } from "../types/transaction.types.ts";

function DeleteTransactionModal({ transactionId }: any) {
  const { transactions, isLoading, isError, error } = useTransactions();

  if (isLoading) return <GlobalSpinner />;

  if (isError) throw new Error(error?.message);

  const transaction: Transaction | undefined = transactions!.find(
    (transaction) => transaction.transactionId === transactionId,
  );

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
