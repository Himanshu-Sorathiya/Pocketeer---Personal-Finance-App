import type { Table } from "@tanstack/react-table";

import type { Transaction } from "../transaction.types.ts";

function PaginationInfo({ table }: { table: Table<Transaction> }) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRecords = table.getPrePaginationRowModel().rows.length;

  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalRecords);

  return (
    <div className="text-sm text-gray-500">
      Showing{" "}
      <span className="font-space-grotesk text-text font-semibold">
        {start}
      </span>{" "}
      to{" "}
      <span className="font-space-grotesk text-text font-semibold">{end}</span>{" "}
      of{" "}
      <span className="font-space-grotesk text-text font-semibold">
        {totalRecords}
      </span>{" "}
      transactions –{" "}
      <span className="text-gray-700">
        Every transaction echoes in your finances.
      </span>
    </div>
  );
}

export default PaginationInfo;
