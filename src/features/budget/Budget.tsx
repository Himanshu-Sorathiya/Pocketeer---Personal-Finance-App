import { useStore } from "@tanstack/react-store";

import ModalLayout from "../../layouts/ModalLayout.tsx";

import { modalStore } from "../../store/appModalStore.ts";

import CreateBudgetModal from "./budget_modals/CreateBudgetModal.tsx";
import DeleteBudgetModal from "./budget_modals/DeleteBudgetModal.tsx";
import UpdateBudgetModal from "./budget_modals/UpdateBudgetModal.tsx";
import BudgetMain from "./BudgetMain.tsx";

import Header from "../../components/ui/Header.tsx";

function Budget() {
  const id = useStore(modalStore, (s) => s.id);
  const budgetId = useStore(modalStore, (s) => s.data);

  return (
    <>
      <Header title="Budget" modalId="create_budget">
        Craft a Budget
      </Header>

      {id && ["create_budget", "edit_budget", "delete_budget"].includes(id) && (
        <ModalLayout>
          {id === "create_budget" && <CreateBudgetModal />}
          {id === "edit_budget" && <UpdateBudgetModal budgetId={budgetId} />}
          {id === "delete_budget" && <DeleteBudgetModal budgetId={budgetId} />}
        </ModalLayout>
      )}

      <BudgetMain />
    </>
  );
}

export default Budget;
