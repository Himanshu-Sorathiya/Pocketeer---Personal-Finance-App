import ListBody from "./ListBody.tsx";
import ListHeader from "./ListHeader.tsx";

import type { Budget } from "../types/budget.types.ts";

function BudgetList({ budgets }: { budgets: Budget[] }) {
  return (
    <div className="flex flex-col gap-4">
      {budgets.map((budget) => (
        <div
          key={budget.id}
          className="bg-shade-100 flex flex-col gap-3 rounded-md px-6 py-4"
        >
          <ListHeader budget={budget} />

          <ListBody budget={budget} />
        </div>
      ))}
    </div>
  );
}

export default BudgetList;
