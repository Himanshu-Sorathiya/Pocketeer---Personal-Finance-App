import type { Dispatch, SetStateAction } from "react";

import type { Table } from "@tanstack/react-table";

import TableBody from "./TableBody.tsx";
import TableHeader from "./TableHeader.tsx";

import type { SelectedOptions, Transaction } from "../transaction.types.ts";

function TransactionTable({
  table,
  sortOptions,
  selectedSort,
  setSelectedSort,
}: {
  table: Table<Transaction>;
  sortOptions: Record<string, string[]>;
  selectedSort: SelectedOptions;
  setSelectedSort: Dispatch<SetStateAction<SelectedOptions>>;
}) {
  return (
    <table className="min-w-full">
      <TableHeader
        table={table}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      <TableBody table={table} />
    </table>
  );
}

export default TransactionTable;
