import { useStore } from "@tanstack/react-store";

import { budgetStore } from "../store/budgetStore.ts";

import CancelButton from "../../../components/modals/CancelButton.tsx";
import DeleteButton from "../../../components/modals/DeleteButton.tsx";

function DeleteBudgetModal({ budgetId }: any) {
  const budget = [...useStore(budgetStore, (s) => s.budgets)].find(
    (budget) => budget.id === budgetId,
  );

  return (
    <div className="flex min-w-lg flex-col gap-3">
      <h1 className="text-3xl font-semibold wrap-normal">
        Delete "
        {budget?.category
          .split("_")
          .map(
            (part) =>
              part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
          )
          .join(" & ")}
        " Budget?
      </h1>

      <p className="text-text text-sm">
        Ready to retire this budget? Deleting it will clear your set limits and
        tracking—make sure it fits your financial shift with Pocketeer!{" "}
      </p>

      <DeleteButton label="Yes, Delete" />

      <CancelButton label="Cancel" />
    </div>
  );
}

export default DeleteBudgetModal;
