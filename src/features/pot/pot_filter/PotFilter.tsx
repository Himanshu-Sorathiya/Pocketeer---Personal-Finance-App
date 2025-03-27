import FilterSearch from "./FilterSearch.tsx";
import FilterStatus from "./FilterStatus.tsx";

import type { SelectedOptions } from "../../../types/global.types.ts";

function PotFilter({
  handleSearchChange,
  handleStatusChange,
  selectedStatus,
}: {
  handleSearchChange: (value: string) => void;
  handleStatusChange: (_: string, value: string) => void;
  selectedStatus: SelectedOptions;
}) {
  return (
    <div className="flex gap-8">
      <FilterSearch handleSearchChange={handleSearchChange} />

      <FilterStatus
        selectedStatus={selectedStatus}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default PotFilter;
