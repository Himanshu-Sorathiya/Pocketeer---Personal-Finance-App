import FilterCategory from "./FilterCategory.tsx";
import FilterDate from "./FilterDate.tsx";
import FilterSearch from "./FilterSearch.tsx";

function TransactionFilter() {
  return (
    <div className="mt-1 flex min-w-full gap-8">
      <FilterSearch />

      <FilterCategory />

      <FilterDate />
    </div>
  );
}

export default TransactionFilter;
