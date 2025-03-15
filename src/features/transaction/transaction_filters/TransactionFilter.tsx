
import CategoryFilter from "./CategoryFilter.tsx";
import DateFilter from "./DateFilter.tsx";
import SearchFilter from "./SearchFilter.tsx";

import type { SelectedOptions } from "../transaction.types.ts";

function TransactionFilter({
  categoryOptions,
  selectedCategory,
  setSelectedCategory,
}: {
  categoryOptions: Record<string, string[]>;
  selectedCategory: SelectedOptions;
  setSelectedCategory: (newCategory: string) => void;
}) {
  return (
    <div className="mt-1 flex min-w-full gap-8">
      <SearchFilter />

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
