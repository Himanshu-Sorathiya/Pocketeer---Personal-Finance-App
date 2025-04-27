import { Route as TransactionRoute } from "../../../routes/app/transaction.tsx";

import { useTransactions } from "../../../hooks/useTransactions.ts";

import GlobalSpinner from "../../../components/loaders/GlobalSpinner.tsx";
import RecentTransaction from "../../../components/ui/RecentTransaction.tsx";
import SummeryHeader from "../../../components/ui/SummeryHeader.tsx";

import type { Transaction } from "../../transaction/types/transaction.types.ts";

function SummeryTransaction() {
  return (
    <div className="bg-shade-100 row-span-2 rounded-md px-6 pt-7 pb-2">
      <SummeryHeader
        to={TransactionRoute.to}
        header="Transactions"
        label="Dive In"
        onClick={() => {}}
        headerClass="text-2xl"
      />

      <RecentTransactions />
    </div>
  );
}

function RecentTransactions() {
  const { transactions, isLoading, isError, error } = useTransactions();

  if (isLoading) return <GlobalSpinner />;

  if (isError) throw new Error(error?.message);

  const latestTransactions: Transaction[] = [...transactions!]
    .sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(),
    )
    .slice(0, 7);

  return (
    <div className="divide-y divide-gray-200">
      {latestTransactions.map((transaction) => (
        <RecentTransaction
          key={transaction.transactionId}
          transaction={transaction}
        />
      ))}
    </div>
  );
}

export default SummeryTransaction;
