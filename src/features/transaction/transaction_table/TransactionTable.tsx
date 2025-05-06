import type { HeaderGroup, RowModel } from "@tanstack/react-table";

import TableBody from "./TableBody.tsx";
import TableHeader from "./TableHeader.tsx";

import TransactionPlaceholder from "../transaction_placeholder/TransactionPlaceholder.tsx";

import type { Transaction } from "../types/transaction.types.ts";

function TransactionTable({
  headerGroups,
  rowModels,
}: {
  headerGroups: HeaderGroup<Transaction>[];
  rowModels: RowModel<Transaction>;
}) {
  const shouldShowPlaceholder = rowModels.rows.length === 0;

  if (shouldShowPlaceholder) return <TransactionPlaceholder />;

  return (
    <table className="min-w-full">
      <TableHeader headerGroups={headerGroups} />

      <TableBody rowModels={rowModels} />
    </table>
  );
}

export default TransactionTable;
