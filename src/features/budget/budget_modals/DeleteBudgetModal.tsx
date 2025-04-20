import { useStore } from "@tanstack/react-store";

import { budgetStore } from "../store/budgetStore.ts";

import CancelButton from "../../../components/buttons/CancelButton.tsx";
import DeleteButton from "../../../components/buttons/DeleteButton.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

function DeleteBudgetModal({ budgetId }: any) {
  const budget = [...useStore(budgetStore, (s) => s.budgets)].find(
    (budget) => budget.budgetId === budgetId,
  );

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <ModalHeader
        title={`Delete "${budget?.category
          .split("_")
          .map(
            (part) =>
              part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
          )
          .join(" & ")}" Budget?`}
      />

      <ModalDescription description="Ready to retire this budget? Deleting it will clear your set limits and tracking—make sure it fits your financial shift with Pocketeer!" />

      <DeleteButton label="Yes, Delete" />

      <CancelButton label="Cancel" />
    </div>
  );
}

export default DeleteBudgetModal;
