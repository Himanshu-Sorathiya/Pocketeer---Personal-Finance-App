import type { HeaderGroup, RowModel } from "@tanstack/react-table";

import TableBody from "./TableBody.tsx";
import TableHeader from "./TableHeader.tsx";

import type { SelectedOptions, Transaction } from "../transaction.types.ts";

function TransactionTable({
  headerGroups,
  rowModels,
  sortOptions,
  selectedSort,
  setSelectedSort,
}: {
  headerGroups: HeaderGroup<Transaction>[];
  rowModels: RowModel<Transaction>;
  sortOptions: Record<string, string[]>;
  selectedSort: SelectedOptions;
  setSelectedSort: (type: string, value: string) => void;
}) {
  return (
    <table className="min-w-full">
      <TableHeader
        headerGroups={headerGroups}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      <TableBody rowModels={rowModels} />
    </table>
  );
}

export default TransactionTable;
