import type { Table } from "@tanstack/react-table";

import PaginationControls from "./PaginationControls.tsx";
import PaginationInfo from "./PaginationInfo.tsx";

import type { Transaction } from "../transaction.types.ts";

function TransactionPagination({ table }: { table: Table<Transaction> }) {
  return (
    <div className="mt-auto flex flex-col items-center gap-1">
      <PaginationInfo table={table} />

      <PaginationControls table={table} />
    </div>
  );
}

export default TransactionPagination;
