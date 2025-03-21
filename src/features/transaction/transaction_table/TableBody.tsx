import { type Row, type RowModel, flexRender } from "@tanstack/react-table";

import type { Transaction } from "../types/transaction.types.ts";

function TableBody({ rowModels }: { rowModels: RowModel<Transaction> }) {
  return (
    <tbody className="divide-y divide-gray-200">
      {rowModels.rows.map((row: Row<Transaction>) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="px-4 py-3 whitespace-nowrap text-gray-700"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
