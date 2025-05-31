import FilterCategory from "./FilterCategory.tsx";
import FilterDate from "./FilterDate.tsx";
import FilterSearch from "./FilterSearch.tsx";
import FilterType from "./FilterType.tsx";

function TransactionFilter() {
  return (
    <div className="mt-1 grid grid-cols-[3fr_2fr_2fr_2fr] min-w-full gap-8">
      <FilterSearch />

      <FilterCategory />

      <FilterDate />

      <FilterType />
    </div>
  );
}

export default TransactionFilter;
