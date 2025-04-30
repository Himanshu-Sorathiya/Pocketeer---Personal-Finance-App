import ListBody from "./ListBody.tsx";
import ListHeader from "./ListHeader.tsx";

import type { Budget } from "../types/budget.types.ts";

function BudgetList({
  budget,
  selectedBudgetId,
}: {
  budget: Budget;
  selectedBudgetId: string;
}) {
  return (
    <div className="bg-shade-100 flex flex-col gap-3 rounded-md px-6 py-4">
      <ListHeader budget={budget} selectedBudgetId={selectedBudgetId} />

      <ListBody budget={budget} />
    </div>
  );
}

export default BudgetList;
