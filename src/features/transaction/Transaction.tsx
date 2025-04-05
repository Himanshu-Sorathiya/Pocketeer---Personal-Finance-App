import { useStore } from "@tanstack/react-store";

import ModalLayout from "../../layouts/ModalLayout.tsx";

import {
  closeModal,
  modalStore,
  openModal,
} from "../../store/appModalStore.ts";

import CreateTransactionModal from "./transaction_modals/CreateTransactionModal.tsx";
import DeleteTransactionModal from "./transaction_modals/DeleteTransactionModal.tsx";
import EditTransactionModal from "./transaction_modals/EditTransactionModal.tsx";
import TransactionMain from "./TransactionMain.tsx";

import Header from "../../components/ui/Header.tsx";

function Transaction() {
  const id = useStore(modalStore, (s) => s.id);
  const data = useStore(modalStore, (s) => s.data);

  function handleOpenModal() {
    openModal("create_transaction");
  }

  function handleCloseModal() {
    closeModal();
  }

  return (
    <>
      <Header title="Transaction">
        <button
          type="button"
          onClick={handleOpenModal}
          className="cursor-pointer rounded bg-gray-800 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-gray-900"
        >
          Add Transaction
        </button>
      </Header>

      {id &&
        [
          "create_transaction",
          "edit_transaction",
          "delete_transaction",
        ].includes(id) && (
          <ModalLayout onClose={handleCloseModal}>
            {id === "create_transaction" && <CreateTransactionModal />}
            {id === "edit_transaction" && <EditTransactionModal data={data} />}
            {id === "delete_transaction" && (
              <DeleteTransactionModal data={data} />
            )}
          </ModalLayout>
        )}

      <TransactionMain />
    </>
  );
}

export default Transaction;
