import { useStore } from "@tanstack/react-store";

import { Route as TransactionRoute } from "../../../routes/app/transaction.tsx";

import { transactionStore } from "../../transaction/store/transactionStore.ts";

import RecentTransaction from "../../../components/ui/RecentTransaction.tsx";
import SummeryHeader from "../../../components/ui/SummeryHeader.tsx";

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
  const latestTransactions = [
    ...useStore(transactionStore, (s) => s.transactions),
  ].slice(0, 7);

  return (
    <div className="divide-y divide-gray-200">
      {latestTransactions.map((transaction) => (
        <RecentTransaction key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

export default SummeryTransaction;
