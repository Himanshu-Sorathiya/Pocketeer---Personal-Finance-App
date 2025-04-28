import { useStore } from "@tanstack/react-store";
import {
  type ColumnFiltersState,
  type ColumnHelper,
  type PaginationState,
  type SortingState,
  type Table,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { transactionStore } from "./store/transactionStore.ts";

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

import {
  filterAmount,
  filterCategory,
  filterDate,
  filterFuzzy,
  setColumnFilters,
  setPagination,
  setSorting,
  sortAmount,
  sortDate,
  sortFuzzy,
} from "./transaction_helpers/transactionHelpers.ts";

function TransactionMain() {
  const columnHelper: ColumnHelper<Transaction> =
    createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("recipient", {
      id: "recipient",
      cell: (info) => (
        <RecipientCell
          transactionId={info.row.id}
          recipient={info.getValue()}
        />
      ),
      header: () => "Recipient",
      filterFn: filterFuzzy,
      sortingFn: sortFuzzy,
    }),
    columnHelper.accessor("category", {
      id: "category",
      cell: (info) => <CategoryCell category={info.getValue()} />,
      header: () => "Category",
      filterFn: filterCategory,
    }),
    columnHelper.accessor("creationDate", {
      id: "date",
      cell: (info) => <DateCell date={info.getValue()} />,
      header: () => "Date",
      filterFn: filterDate,
      sortingFn: sortDate,
    }),
    columnHelper.accessor((row) => `${row.currency}${row.amount}`, {
      id: "amount",
      cell: (info) => (
        <AmountCell
          amount={info.row.original.amount}
          currency={info.row.original.currency}
          type={info.row.original.type}
        />
      ),
      header: () => "Amount",
      filterFn: filterAmount,
      sortingFn: sortAmount,
    }),

    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <ActionsCell transactionId={info.row.original.transactionId} />
      ),
      header: () => null,
    }),
  ];

  const transactions: Transaction[] = useStore(
    transactionStore,
    (s) => s.transactions,
  );

  const columnFilters: ColumnFiltersState = useStore(
    transactionStore,
    (s) => s.columnFilters,
  );
  const sorting: SortingState = useStore(transactionStore, (s) => s.sorting);
  const pagination: PaginationState = useStore(
    transactionStore,
    (s) => s.pagination,
  );

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

    getRowId: (row) => row.transactionId,
    autoResetPageIndex: false,
  });

  const shouldShowPlaceholder = table.getRowModel().rows.length === 0;

  return (
    <div className="bg-shade-100 flex min-h-full flex-col gap-5 overflow-visible rounded-md p-4 whitespace-nowrap">
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
