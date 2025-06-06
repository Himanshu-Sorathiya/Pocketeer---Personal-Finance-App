import { useStore } from "@tanstack/react-store";

import ModalLayout from "../../layouts/ModalLayout.tsx";

import { modalStore } from "../../store/appModalStore.ts";

import CreateTransactionModal from "./transaction_modals/CreateTransactionModal.tsx";
import DeleteTransactionModal from "./transaction_modals/DeleteTransactionModal.tsx";
import UpdateTransactionModal from "./transaction_modals/UpdateTransactionModal.tsx";
import TransactionMain from "./TransactionMain.tsx";

import Header from "../../components/ui/Header.tsx";

function Transaction() {
  const id = useStore(modalStore, (s) => s.id);
  const transactionId = useStore(modalStore, (s) => s.data);

  return (
    <>
      <Header title="Transaction" modalId="create_transaction">
        Add Transaction
      </Header>

      {id &&
        [
          "create_transaction",
          "edit_transaction",
          "delete_transaction",
        ].includes(id) && (
          <ModalLayout>
            {id === "create_transaction" && <CreateTransactionModal />}
            {id === "edit_transaction" && (
              <UpdateTransactionModal transactionId={transactionId} />
            )}
            {id === "delete_transaction" && (
              <DeleteTransactionModal transactionId={transactionId} />
            )}
          </ModalLayout>
        )}

      <TransactionMain />
    </>
  );
}

export default Transaction;
