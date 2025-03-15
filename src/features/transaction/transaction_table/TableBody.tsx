import { type Row, type Table, flexRender } from '@tanstack/react-table';

import type { Transaction } from "../transaction.types.ts";

function TableBody({ table }: { table: Table<Transaction> }) {
  return (
    <tbody className="divide-y divide-gray-200">
      {table.getRowModel().rows.map((row: Row<Transaction>) => (
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
