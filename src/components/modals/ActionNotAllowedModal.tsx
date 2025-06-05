import { useNavigate } from "@tanstack/react-router";

import { Route as accountRoute } from "../../routes/app/account.tsx";

import { handleCloseModal } from "../../store/appModalStore.ts";

import Button from "../buttons/Button.tsx";
import ModalDescription from "../ui/ModalDescription.tsx";
import ModalHeader from "../ui/ModalHeader.tsx";

function ActionNotAllowedModal() {
  const navigate = useNavigate();

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <ModalHeader title="Action Not Allowed" />

      <ModalDescription description="Your currency isn't set yet. Please head to your account and update it to continue using Pocketeer." />

      <Button
        label="Go to Accounts Page"
        onClick={() => {
          navigate({ to: accountRoute.to });

          handleCloseModal();
        }}
      />
    </div>
  );
}

export default ActionNotAllowedModal;
