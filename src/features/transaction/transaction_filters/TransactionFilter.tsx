import CategoryFilter from "./CategoryFilter.tsx";
import DateFilter from "./DateFilter.tsx";
import SearchFilter from "./SearchFilter.tsx";

import type { SelectedOptions } from "../transaction.types.ts";

function TransactionFilter({
  categoryOptions,
  selectedCategory,
  selectedWeek,
  setSelectedCategory,
  setSearchedRecipient,
  setSelectedWeek,
}: {
  categoryOptions: Record<string, string[]>;
  selectedCategory: SelectedOptions;
  selectedWeek: [Date, Date];
  setSelectedCategory: (newCategory: string) => void;
  setSearchedRecipient: (value: string) => void;
  setSelectedWeek: (value: [Date, Date]) => void;
}) {
  return (
    <div className="mt-1 flex min-w-full gap-8">
      <SearchFilter setSearchedRecipient={setSearchedRecipient} />

      <CategoryFilter
        categoryOptions={categoryOptions}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <DateFilter
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
      />
    </div>
  );
}

export default TransactionFilter;
