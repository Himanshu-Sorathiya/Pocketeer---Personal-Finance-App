import { useStore } from "@tanstack/react-store";

import { Route as TransactionRoute } from "../../../routes/app/transaction.tsx";

import { transactionStore } from "../../transaction/store/transactionStore.ts";

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
  const transactions: Transaction[] = useStore(
    transactionStore,
    (s) => s.transactions,
  );

  const latestTransactions: Transaction[] = [...transactions]
    .sort((a, b) => {
      const dateA = new Date(a.creationDate).getTime();
      const dateB = new Date(b.creationDate).getTime();

      if (dateA === dateB) {
        const timeA = a.creationTime.split(":").join("");
        const timeB = b.creationTime.split(":").join("");

        return Number(timeB) - Number(timeA);
      }

      return dateB - dateA;
    })
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
