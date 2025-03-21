import CategoryFilter from "./FilterCategory.tsx";
import DateFilter from "./FilterDate.tsx";
import SearchFilter from "./FilterSearch.tsx";

function TransactionFilter() {
  return (
    <div className="mt-1 flex min-w-full gap-8">
      <SearchFilter />

      <CategoryFilter />

      <DateFilter />
    </div>
  );
}

export default TransactionFilter;
