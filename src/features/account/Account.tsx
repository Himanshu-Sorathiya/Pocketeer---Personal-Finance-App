import { useStore } from "@tanstack/react-store";

import ModalLayout from "../../layouts/ModalLayout.tsx";

import { modalStore } from "../../store/appModalStore.ts";

import CurrencyConversionModal from "./account_modals/CurrencyConversionModal.tsx";
import UpdateProfileModal from "./account_modals/UpdateProfileModal.tsx";
import AccountMain from "./AccountMain.tsx";

import Header from "../../components/ui/Header.tsx";

function Account() {
  const id = useStore(modalStore, (s) => s.id);

  return (
    <>
      <Header title="Account" modalId="update_profile" showSVG={false}>
        Update Profile
      </Header>

      {id && ["update_profile", "currency_conversion"].includes(id) && (
        <ModalLayout>
          {id === "update_profile" && <UpdateProfileModal />}
          {id === "currency_conversion" && <CurrencyConversionModal />}
        </ModalLayout>
      )}

      <AccountMain />
    </>
  );
}

export default Account;
