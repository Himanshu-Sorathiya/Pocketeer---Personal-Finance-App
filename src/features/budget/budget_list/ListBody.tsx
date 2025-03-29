import {
  ListBalance,
  ListProgressChart,
  ListProgressInfo,
  ListRecentTransactions,
} from "./ListElements.tsx";

import type { Budget } from "../types/budget.types.ts";

function ListBody({ budget }: { budget: Budget }) {
  return (
    <div className="flex flex-col gap-3">
      <ListBalance
        targetAmount={budget.targetAmount}
        currency={budget.currency}
      />

      <ListProgressChart
        spentAmount={budget.spentAmount}
        targetAmount={budget.targetAmount}
        currency={budget.currency}
        theme={budget.theme}
      />

      <ListProgressInfo
        spentAmount={budget.spentAmount}
        targetAmount={budget.targetAmount}
        currency={budget.currency}
        theme={budget.theme}
      />

      <ListRecentTransactions category={budget.category} />
    </div>
  );
}

export default ListBody;
