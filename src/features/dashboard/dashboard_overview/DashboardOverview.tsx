import OverviewBalance from "./OverviewBalance.tsx";

function DashboardOverview({
  balance,
  income,
  expense,
  currency,
}: {
  balance: number;
  income: number;
  expense: number;
  currency: string;
}) {
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
