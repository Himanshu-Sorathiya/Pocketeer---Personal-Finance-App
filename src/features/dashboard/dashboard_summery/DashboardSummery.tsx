import { useStore } from "@tanstack/react-store";

import { transactionStore } from "../../transaction/store/transactionStore.ts";

import SummeryBudget from "./SummeryBudget.tsx";
import SummeryPot from "./SummeryPot.tsx";
import SummeryTransaction from "./SummeryTransactions.tsx";

function DashboardSummery() {
  const transactions = [...useStore(transactionStore, (s) => s.transactions)];

  const shouldShowPlaceholder = transactions.length === 0;

  return shouldShowPlaceholder ? (
    <div className="flex flex-col items-center rounded-md bg-white py-3 text-xl font-semibold text-gray-900">
      <p>Looks like your financial world is still taking shape.</p>
      <p>
        Start building budgets, pots, and tracking transactions with Pocketeer!
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-2 items-start gap-8">
      <SummeryTransaction />

      <SummeryPot />

      <SummeryBudget />
    </div>
  );
}

export default DashboardSummery;
