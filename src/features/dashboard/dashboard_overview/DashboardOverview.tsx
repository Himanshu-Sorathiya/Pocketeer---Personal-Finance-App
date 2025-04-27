import { useTransactions } from "../../../hooks/useTransactions.ts";

import OverviewBalance from "./OverviewBalance.tsx";

import GlobalSpinner from "../../../components/loaders/GlobalSpinner.tsx";

function DashboardOverview() {
  const { transactions, isLoading, isError, error } = useTransactions();

  if (isLoading) return <GlobalSpinner />;

  if (isError) throw new Error(error?.message);

  const income = transactions!
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions!
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;
  const currency = transactions![0]?.currency;

  return (
    <div className="grid grid-cols-3 gap-6">
      <OverviewBalance
        label="Current Balance"
        amount={balance}
        currency={currency}
        className="text-shade-100 bg-gray-900"
      />

      <OverviewBalance
        label="Income"
        amount={income}
        currency={currency}
        className="bg-shade-100 text-gray-900"
      />

      <OverviewBalance
        label="Expense"
        amount={expense}
        currency={currency}
        className="bg-shade-100 text-gray-900"
      />
    </div>
  );
}

export default DashboardOverview;
