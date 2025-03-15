import { useState } from 'react';

import {
	type ColumnHelper,
	type Table,
	createColumnHelper,
	getCoreRowModel,
	useReactTable
} from "@tanstack/react-table";

import TransactionFilter from "./transaction_filters/TransactionFilter.tsx";
import TransactionTable from "./transaction_table/TransactionTable.tsx";

import type { SelectedOptions, Transaction } from "./transaction.types.ts";

import transactionIcons from "../../constants/transactionIcons.ts";
import transactionIconsBgColors from "../../constants/transactionIconsBgColors.ts";

function TransactionContainer() {
  const [transactions, _] = useState<Transaction[]>([
    {
      id: "111",
      recipient: "Amazon",
      category: "shopping",
      date: "2025-03-08",
      amount: 1299,
      currency: "₹",
    },
    {
      id: "112",
      recipient: "John Doe",
      category: "debt_loans",
      date: "2025-03-07",
      amount: 15000,
      currency: "₹",
    },
    {
      id: "113",
      recipient: "Netflix",
      category: "entertainment",
      date: "2025-03-06",
      amount: 499,
      currency: "₹",
    },
    {
      id: "114",
      recipient: "Uber",
      category: "transportation",
      date: "2025-03-05",
      amount: 250,
      currency: "₹",
    },
    {
      id: "115",
      recipient: "Jane Smith",
      category: "debt_loans",
      date: "2025-03-04",
      amount: 5000,
      currency: "₹",
    },
    {
      id: "116",
      recipient: "Starbucks",
      category: "food",
      date: "2025-03-03",
      amount: 350,
      currency: "₹",
    },
    {
      id: "117",
      recipient: "Zomato",
      category: "food",
      date: "2025-03-02",
      amount: 800,
      currency: "₹",
    },
    {
      id: "118",
      recipient: "Gym Membership",
      category: "health_fitness",
      date: "2025-03-01",
      amount: 1500,
      currency: "₹",
    },
    {
      id: "119",
      recipient: "Electricity Bill",
      category: "bills",
      date: "2025-02-28",
      amount: 2200,
      currency: "₹",
    },
    {
      id: "120",
      recipient: "Phone Recharge",
      category: "bills",
      date: "2025-02-27",
      amount: 599,
      currency: "₹",
    },
    {
      id: "121",
      recipient: "Spotify",
      category: "entertainment",
      date: "2025-02-26",
      amount: 199,
      currency: "₹",
    },
    {
      id: "122",
      recipient: "Swiggy",
      category: "food",
      date: "2025-02-25",
      amount: 650,
      currency: "₹",
    },
    {
      id: "123",
      recipient: "Flight Ticket",
      category: "transportation",
      date: "2025-02-24",
      amount: 4500,
      currency: "₹",
    },
    {
      id: "124",
      recipient: "Book Store",
      category: "education",
      date: "2025-02-23",
      amount: 1200,
      currency: "₹",
    },
    {
      id: "125",
      recipient: "Credit Card Payment",
      category: "debt_loans",
      date: "2025-02-22",
      amount: 7000,
      currency: "₹",
    },
    {
      id: "126",
      recipient: "Hospital Bill",
      category: "health_fitness",
      date: "2025-02-21",
      amount: 3000,
      currency: "₹",
    },
    {
      id: "127",
      recipient: "Mutual Fund Investment",
      category: "investments",
      date: "2025-02-20",
      amount: 10000,
      currency: "₹",
    },
    {
      id: "128",
      recipient: "Theater Tickets",
      category: "entertainment",
      date: "2025-02-19",
      amount: 1200,
      currency: "₹",
    },
    {
      id: "129",
      recipient: "Mobile Accessories",
      category: "shopping",
      date: "2025-02-18",
      amount: 800,
      currency: "₹",
    },
    {
      id: "130",
      recipient: "Tax Payment",
      category: "taxes",
      date: "2025-02-17",
      amount: 5000,
      currency: "₹",
    },
  ]);

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
    }),
    columnHelper.accessor("category", {
      cell: (info) =>
        info
          .getValue()
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" & "),
      header: () => "Category",
    }),
    columnHelper.accessor("date", {
      cell: (info) => info.getValue(),
      header: () => "Date",
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

  const sortOptions: Record<string, string[]> = {
    date: ["newest", "oldest"],
    amount: ["default", "highest", "lowest"],
  };

  const categoryOptions = {
    category: [
      "default",
      "entertainment",
      "bills",
      "food",
      "transportation",
      "education",
      "shopping",
      "health_Fitness",
      "savings",
      "investments",
      "debt_Loans",
      "income",
      "taxes",
      "miscellaneous",
      "general",
    ],
  };

  const [selectedSort, setSelectedSort] = useState<SelectedOptions>({
    type: "date",
    value: "newest",
  });

  const [selectedCategory, setSelectedCategory] = useState<SelectedOptions>({
    type: "category",
    value: "default",
  });

  const table: Table<Transaction> = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),

    getRowId: (row) => row.id,
  });

  return (
    <div className="bg-shade-100 flex flex-col gap-3 overflow-x-auto rounded-[20px] p-4">
      <TransactionFilter
        categoryOptions={categoryOptions}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <TransactionTable
        table={table}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
    </div>
  );
}

export default TransactionContainer;
