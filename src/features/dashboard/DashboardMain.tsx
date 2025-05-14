import { useUser } from "../auth/hooks/useUser.ts";
import { useReadTransactions } from "../transaction/hooks/useReadTransactions.ts";

import DashboardOverview from "./dashboard_overview/DashboardOverview.tsx";
import DashboardPlaceholder from "./dashboard_placeholder/DashboardPlaceholder.tsx";
import DashboardSummery from "./dashboard_summery/DashboardSummery.tsx";

function DashboardMain() {
  const { currency_symbol } = useUser();
  const { transactions } = useReadTransactions();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  const shouldShowPlaceholder = transactions.length === 0;

  return (
    <div className="flex flex-col gap-8 whitespace-nowrap">
      <DashboardOverview
        income={income}
        expense={expense}
        balance={balance}
        currency={currency_symbol}
      />

      {shouldShowPlaceholder && <DashboardPlaceholder />}

      {!shouldShowPlaceholder && <DashboardSummery />}
    </div>
  );
}

export default DashboardMain;
