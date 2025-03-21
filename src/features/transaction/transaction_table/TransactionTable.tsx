import type { HeaderGroup, RowModel } from "@tanstack/react-table";

import TableBody from "./TableBody.tsx";
import TableHeader from "./TableHeader.tsx";

import type { Transaction } from "../types/transaction.types.ts";

function TransactionTable({
  headerGroups,
  rowModels,
}: {
  headerGroups: HeaderGroup<Transaction>[];
  rowModels: RowModel<Transaction>;
}) {
  return (
    <table className="min-w-full">
      <TableHeader headerGroups={headerGroups} />

      <TableBody rowModels={rowModels} />
    </table>
  );
}

export default TransactionTable;
