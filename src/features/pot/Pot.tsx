import { useStore } from "@tanstack/react-store";

import ModalLayout from "../../layouts/ModalLayout.tsx";

import {
  closeModal,
  modalStore,
  openModal,
} from "../../store/appModalStore.ts";

import AddMoneyToPotModal from "./pot_modals/AddMoneyToPotModal.tsx";
import CreatePotModal from "./pot_modals/CreatePotModal.tsx";
import DeletePotModal from "./pot_modals/DeletePotModal.tsx";
import EditPotModal from "./pot_modals/EditPotModal.tsx";
import WithdrawMoneyFromPotModal from "./pot_modals/WithdrawMoneyFromPotModal.tsx";
import PotMain from "./PotMain.tsx";

import Header from "../../components/ui/Header.tsx";

function Pot() {
  const id = useStore(modalStore, (s) => s.id);
  const data = useStore(modalStore, (s) => s.data);

  function handleOpenModal() {
    openModal("create_pot");
  }

  function handleCloseModal() {
    closeModal();
  }

  return (
    <>
      <Header title="Pot">
        <button
          type="button"
          onClick={handleOpenModal}
          className="cursor-pointer rounded bg-gray-800 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-gray-900"
        >
          Plant a Pot
        </button>
      </Header>

      {id &&
        [
          "create_pot",
          "edit_pot",
          "delete_pot",
          "pot_add_money",
          "pot_withdraw_money",
        ].includes(id) && (
          <ModalLayout onClose={handleCloseModal}>
            {id === "create_pot" && <CreatePotModal />}
            {id === "edit_pot" && <EditPotModal data={data} />}
            {id === "delete_pot" && <DeletePotModal data={data} />}
            {id === "pot_add_money" && <AddMoneyToPotModal data={data} />}
            {id === "pot_withdraw_money" && (
              <WithdrawMoneyFromPotModal data={data} />
            )}
          </ModalLayout>
        )}

      <PotMain />
    </>
  );
}

export default Pot;
