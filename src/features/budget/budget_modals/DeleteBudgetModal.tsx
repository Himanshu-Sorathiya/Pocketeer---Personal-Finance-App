import { useBudgets } from "../../../hooks/useBudgets.ts";

import CancelButton from "../../../components/buttons/CancelButton.tsx";
import DeleteButton from "../../../components/buttons/DeleteButton.tsx";
import GlobalSpinner from "../../../components/loaders/GlobalSpinner.tsx";
import ModalDescription from "../../../components/ui/ModalDescription.tsx";
import ModalHeader from "../../../components/ui/ModalHeader.tsx";

import type { Budget } from "../types/budget.types.ts";

function DeleteBudgetModal({ budgetId }: any) {
  const { budgets, isLoading, isError, error } = useBudgets();

  if (isLoading) return <GlobalSpinner />;

  if (isError) throw new Error(error?.message);

  const budget: Budget | undefined = budgets!.find(
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
