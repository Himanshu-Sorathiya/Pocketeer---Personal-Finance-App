import CategoryFilter from "./CategoryFilter.tsx";
import DateFilter from "./DateFilter.tsx";
import SearchFilter from "./SearchFilter.tsx";

import type { Table } from "@tanstack/react-table";
import type { Dispatch } from "react";
import type { SelectedOptions, Transaction } from "../transaction.types.ts";

function TransactionFilter({
  table,
  categoryOptions,
  selectedCategory,
  setSelectedCategory,
  setSearchedRecipient,
}: {
  table: Table<Transaction>;
  categoryOptions: Record<string, string[]>;
  selectedCategory: SelectedOptions;
  setSelectedCategory: (newCategory: string) => void;
  setSearchedRecipient: Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="mt-1 flex min-w-full gap-8">
      <SearchFilter table={table} setSearchedRecipient={setSearchedRecipient} />

      <CategoryFilter
        categoryOptions={categoryOptions}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <DateFilter />
    </div>
  );
}

export default TransactionFilter;
