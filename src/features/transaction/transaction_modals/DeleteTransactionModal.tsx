import { useStore } from "@tanstack/react-store";
import { transactionStore } from "../store/transactionStore.ts";

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
        from your financial history in Pocketeer.{" "}
      </p>

      <div className="flex">
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-orange-600 py-3 text-lg font-medium text-white transition-all duration-150 hover:bg-orange-700"
        >
          Yes, Delete
        </button>
      </div>

      <div className="flex">
        <button
          type="submit"
          className="text-text w-full cursor-pointer rounded-md bg-gray-200 py-3 text-lg font-medium transition-all duration-150 hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteTransactionModal;
