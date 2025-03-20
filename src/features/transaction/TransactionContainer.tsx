import { useState } from "react";

import {
  type RankingInfo,
  compareItems,
  rankItem,
} from "@tanstack/match-sorter-utils";
import {
  type ColumnFiltersState,
  type ColumnHelper,
  type FilterFn,
  type SortingFn,
  type Table,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table";

import { getTransactions } from "./data/transaction_data.ts";
import TransactionFilter from "./transaction_filters/TransactionFilter.tsx";
import TransactionPagination from "./transaction_pagination/TransactionPagination.tsx";
import TransactionTable from "./transaction_table/TransactionTable.tsx";

import type { SelectedOptions, Transaction } from "./transaction.types.ts";

import categoryOptions from "../../constants/transactionCategoryOptions.ts";
import transactionIcons from "../../constants/transactionIcons.ts";
import transactionIconsBgColors from "../../constants/transactionIconsBgColors.ts";
import sortOptions from "../../constants/transactionSortOptions.ts";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank?.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  const metaA = rowA.columnFiltersMeta[columnId] as { itemRank?: RankingInfo };
  const metaB = rowB.columnFiltersMeta[columnId] as { itemRank?: RankingInfo };

  let dir = 0;

  if (metaA?.itemRank && metaB?.itemRank) {
    dir = compareItems(metaA.itemRank, metaB.itemRank);
  }

  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

function TransactionContainer() {
  const [transactions] = useState<Transaction[]>(getTransactions());

  const columnHelper: ColumnHelper<Transaction> =
    createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("recipient", {
      cell: (info) => {
        const recipient = info.getValue();
        const category = info.row.original.category;
        const randomNum =
          Math.floor(
            Math.random() *
              (transactionIcons[category as keyof typeof transactionIcons] ||
                1),
          ) + 1;
        const iconPath = `/src/assets/icons/transaction_icons_sprite.svg#${category}${randomNum}`;
        const randomColor =
          transactionIconsBgColors[Math.floor(Math.random() * 14)];

        return (
          <div className="flex items-center gap-2 font-medium">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: randomColor }}
            >
              <svg className="h-6 w-6">
                <use href={iconPath} />
              </svg>
            </div>

            <span>{recipient}</span>
          </div>
        );
      },
      header: () => "Recipient",
      filterFn: fuzzyFilter,
      sortingFn: fuzzySort,
    }),
    columnHelper.accessor("category", {
      cell: (info) =>
        info
          .getValue()
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" & "),
      header: () => "Category",
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue === "default") return true;
        return row.getValue(columnId) === filterValue;
      },
    }),
    columnHelper.accessor("date", {
      cell: (info) => info.getValue(),
      header: () => "Date",
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;

        const [startDateStr, endDateStr] = JSON.parse(filterValue) as [
          string,
          string,
        ];

        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        const transactionDate = new Date(row.getValue(columnId));

        return transactionDate >= startDate && transactionDate <= endDate;
      },
    }),
    columnHelper.accessor((row) => `${row.currency}${row.amount}`, {
      id: "amount",
      cell: (info) => (
        <span className="font-space-grotesk font-medium">
          {info.getValue()}
        </span>
      ),
      header: () => "Amount",
    }),

    columnHelper.display({
      id: "actions",
      cell: () => (
        <div className="flex items-center justify-center">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <svg className="flex h-6 w-6 items-center justify-center">
              <use href="/src/assets/icons/ui_icons_sprite.svg#actions-vertical"></use>
            </svg>
          </button>
        </div>
      ),
      header: () => null,
    }),
  ];

  const [selectedSort, setSelectedSort] = useState<SelectedOptions>({
    type: "date",
    value: "newest",
  });

  const [selectedCategory, setSelectedCategory] = useState<SelectedOptions>({
    type: "category",
    value: "all",
  });

  const [searchedRecipient, setSearchedRecipient] = useState<string>("");

  const [selectedWeek, setSelectedWeek] = useState<[Date, Date]>([
    new Date(2020, 0, 1),
    new Date(),
  ]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table: Table<Transaction> = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,

    filterFns: {
      fuzzyFilter: fuzzyFilter,
    },
    sortingFns: {
      fuzzySort: fuzzySort,
    },

    getRowId: (row) => row.id,
  });

  function updateFilter(
    search: string,
    category: string,
    dateRange: [Date, Date],
  ) {
    const filters = [{ id: "recipient", value: search }];

    if (category !== "all") {
      filters.push({ id: "category", value: category });
    }

    filters.push({ id: "date", value: JSON.stringify(dateRange) });

    setColumnFilters(filters);
  }

  function handleSearchChange(newValue: string) {
    setSearchedRecipient(newValue);
    updateFilter(newValue, selectedCategory.value, selectedWeek);
  }

  function handleCategoryChange(newCategory: string) {
    setSelectedCategory({ type: "category", value: newCategory });
    updateFilter(searchedRecipient, newCategory, selectedWeek);
  }

  function handleDateRangeChange(newRange: [Date, Date]) {
    setSelectedWeek(newRange);
    updateFilter(searchedRecipient, selectedCategory.value, newRange);
  }

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

      <TransactionTable
        table={table}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      <TransactionPagination table={table} />
    </div>
  );
}

export default TransactionContainer;
