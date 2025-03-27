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
    <div className="bg-shade-100 flex gap-5 overflow-visible rounded-md p-4">
      <FilterSearch handleSearchChange={handleSearchChange} />

      <FilterStatus
        handleStatusChange={handleStatusChange}
        selectedStatus={selectedStatus}
      />
    </div>
  );
}

export default PotFilter;
