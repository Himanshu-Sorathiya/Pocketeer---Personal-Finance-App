import { useState } from "react";

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

import { useTransactionState } from "./useTransactionsState.ts";

import { getTransactions } from "./data/transaction_data.ts";
import TransactionFilter from "./transaction_filters/TransactionFilter.tsx";
import {
  filterCategory,
  filterDate,
  sortAmount,
  sortDate,
} from "./transaction_helpers/transactionHelpers.ts";
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

import categoryOptions from "../../constants/transactionCategoryOptions.ts";
import sortOptions from "../../constants/transactionSortOptions.ts";

import { fuzzyFilter, fuzzySort } from "../../utilities/tableUtils.ts";

function TransactionMain() {
  const [transactions] = useState<Transaction[]>(getTransactions());

  const columnHelper: ColumnHelper<Transaction> =
    createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("recipient", {
      id: "recipient",
      cell: (info) => (
        <RecipientCell
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

  const {
    columnFilters,
    sorting,
    pagination,
    setColumnFilters,
    setSorting,
    setPagination,

    searchedRecipient,
    selectedCategory,
    selectedWeek,
    selectedSort,

    handleSearchChange,
    handleCategoryChange,
    handleDateRangeChange,
    handleSortChange,
  } = useTransactionState();

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
    <div className="bg-shade-100 flex min-h-full flex-col gap-5 overflow-x-auto rounded-[20px] p-4">
      <TransactionFilter
        categoryOptions={categoryOptions}
        selectedCategory={selectedCategory}
        selectedWeek={selectedWeek}
        setSelectedCategory={handleCategoryChange}
        setSearchedRecipient={handleSearchChange}
        setSelectedWeek={handleDateRangeChange}
      />

      {shouldShowPlaceholder ? (
        <TransactionPlaceholder
          searchedRecipient={searchedRecipient}
          selectedCategory={selectedCategory}
          selectedWeek={selectedWeek}
        />
      ) : (
        <TransactionTable
          headerGroups={table.getHeaderGroups()}
          rowModels={table.getRowModel()}
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          setSelectedSort={handleSortChange}
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
