import FilterSearch from "./FilterSearch.tsx";
import FilterStatus from "./FilterStatus.tsx";

function PotFilter() {
  return (
    <div className="flex gap-8">
      <FilterSearch />

      <FilterStatus />
    </div>
  );
}

export default PotFilter;
