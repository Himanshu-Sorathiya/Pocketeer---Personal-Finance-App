import { useStore } from "@tanstack/react-store";

import ModalLayout from "../../layouts/ModalLayout.tsx";

import {
  closeModal,
  modalStore,
  openModal,
} from "../../store/appModalStore.ts";

import CreateBudgetModal from "./budget_modals/CreateBudgetModal.tsx";
import DeleteBudgetModal from "./budget_modals/DeleteBudgetModal.tsx";
import EditBudgetModal from "./budget_modals/EditBudgetModal.tsx";
import BudgetMain from "./BudgetMain.tsx";

import Header from "../../components/ui/Header.tsx";

function Budget() {
  const id = useStore(modalStore, (s) => s.id);
  const data = useStore(modalStore, (s) => s.data);

  function handleOpenModal() {
    openModal("create_budget");
  }

  function handleCloseModal() {
    closeModal();
  }

  return (
    <>
      <Header title="Budget">
        <button
          type="button"
          onClick={handleOpenModal}
          className="cursor-pointer rounded bg-gray-800 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-gray-900"
        >
          Craft a Budget
        </button>
      </Header>

      {id && ["create_budget", "edit_budget", "delete_budget"].includes(id) && (
        <ModalLayout onClose={handleCloseModal}>
          {id === "create_budget" && <CreateBudgetModal />}
          {id === "edit_budget" && <EditBudgetModal data={data} />}
          {id === "delete_budget" && <DeleteBudgetModal data={data} />}
        </ModalLayout>
      )}

      <BudgetMain />
    </>
  );
}

export default Budget;
