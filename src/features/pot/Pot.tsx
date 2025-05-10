import { useStore } from "@tanstack/react-store";

import ModalLayout from "../../layouts/ModalLayout.tsx";

import { modalStore } from "../../store/appModalStore.ts";

import AddMoneyToPotModal from "./pot_modals/AddMoneyToPotModal.tsx";
import CreatePotModal from "./pot_modals/CreatePotModal.tsx";
import DeletePotModal from "./pot_modals/DeletePotModal.tsx";
import UpdatePotModal from "./pot_modals/UpdatePotModal.tsx";
import WithdrawMoneyFromPotModal from "./pot_modals/WithdrawMoneyFromPotModal.tsx";
import PotMain from "./PotMain.tsx";

import Header from "../../components/ui/Header.tsx";

function Pot() {
  const id = useStore(modalStore, (s) => s.id);
  const potId = useStore(modalStore, (s) => s.data);

  return (
    <>
      <Header title="Pot" modalId="create_pot">
        Plant a Pot
      </Header>

      {id &&
        [
          "create_pot",
          "edit_pot",
          "delete_pot",
          "pot_add_money",
          "pot_withdraw_money",
        ].includes(id) && (
          <ModalLayout>
            {id === "create_pot" && <CreatePotModal />}
            {id === "edit_pot" && <UpdatePotModal potId={potId} />}
            {id === "delete_pot" && <DeletePotModal potId={potId} />}
            {id === "pot_add_money" && <AddMoneyToPotModal potId={potId} />}
            {id === "pot_withdraw_money" && (
              <WithdrawMoneyFromPotModal potId={potId} />
            )}
          </ModalLayout>
        )}

      <PotMain />
    </>
  );
}

export default Pot;
