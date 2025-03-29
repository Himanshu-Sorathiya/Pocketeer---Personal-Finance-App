import { useState } from "react";

import { useStore } from "@tanstack/react-store";
import {
  type ColumnHelper,
  type Table,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { transactionStore } from "./store/transactionStore.ts";

import { getTransactions } from "./data/transaction_data.ts";
import TransactionFilter from "./transaction_filters/TransactionFilter.tsx";
import TransactionPagination from "./transaction_pagination/TransactionPagination.tsx";
import TransactionPlaceholder from "./transaction_placeholder/TransactionPlaceholder.tsx";
import {
  ActionsCell,
  AmountCell,
  CategoryCell,
  DateCell,
  RecipientCell,
} from "./transaction_table/TableCells.tsx";
import TransactionTable from "./transaction_table/TransactionTable.tsx";

import type { Transaction } from "./types/transaction.types.ts";

import { fuzzyFilter, fuzzySort } from "../../utilities/tableUtils.ts";
import {
  filterCategory,
  filterDate,
  setColumnFilters,
  setPagination,
  setSorting,
  sortAmount,
  sortDate,
} from "./transaction_helpers/transactionHelpers.ts";

function TransactionMain() {
  const [transactions] = useState<Transaction[]>(getTransactions());

  const columnHelper: ColumnHelper<Transaction> =
    createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("recipient", {
      id: "recipient",
      cell: (info) => (
        <RecipientCell
          transactionId={info.row.id}
          recipient={info.getValue()}
          category={info.row.original.category}
        />
      ),
      header: () => "Recipient",
      filterFn: fuzzyFilter,
      sortingFn: fuzzySort,
    }),
    columnHelper.accessor("category", {
      id: "category",
      cell: (info) => <CategoryCell category={info.getValue()} />,
      header: () => "Category",
      filterFn: filterCategory,
    }),
    columnHelper.accessor("date", {
      id: "date",
      cell: (info) => <DateCell date={info.getValue()} />,
      header: () => "Date",
      filterFn: filterDate,
      sortingFn: sortDate,
    }),
    columnHelper.accessor((row) => `${row.currency}${row.amount}`, {
      id: "amount",
      cell: (info) => <AmountCell amount={info.getValue()} />,
      header: () => "Amount",
      sortingFn: sortAmount,
    }),

    columnHelper.display({
      id: "actions",
      cell: () => <ActionsCell />,
      header: () => null,
    }),
  ];

  const columnFilters = useStore(transactionStore, (s) => s.columnFilters);
  const sorting = useStore(transactionStore, (s) => s.sorting);
  const pagination = useStore(transactionStore, (s) => s.pagination);

  const table: Table<Transaction> = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    state: {
      columnFilters,
      sorting,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,

    filterFns: {
      fuzzyFilter: fuzzyFilter,
    },
    sortingFns: {
      fuzzySort: fuzzySort,
    },

    getRowId: (row) => row.id,
  });

  const shouldShowPlaceholder = table.getRowModel().rows.length === 0;

  return (
    <div className="bg-shade-100 flex min-h-full flex-col gap-5 overflow-visible rounded-[20px] p-4 whitespace-nowrap">
      <TransactionFilter />

      {shouldShowPlaceholder ? (
        <TransactionPlaceholder />
      ) : (
        <TransactionTable
          headerGroups={table.getHeaderGroups()}
          rowModels={table.getRowModel()}
        />
      )}

      <TransactionPagination
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={table.getState().pagination.pageSize}
        totalRecords={table.getPrePaginationRowModel().rows.length}
        pageCount={table.getPageCount()}
        firstPage={table.firstPage}
        previousPage={table.previousPage}
        nextPage={table.nextPage}
        lastPage={table.lastPage}
        getCanPreviousPage={table.getCanPreviousPage}
        getCanNextPage={table.getCanNextPage}
      />
    </div>
  );
}

export default TransactionMain;
