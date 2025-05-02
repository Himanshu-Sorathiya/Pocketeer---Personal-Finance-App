import { useState } from "react";

import PotBoard from "./pot_board/PotBoard.tsx";
import PotFilter from "./pot_filter/PotFilter.tsx";
import PotPlaceholder from "./pot_placeholder/PotPlaceholder.tsx";
import PotSort from "./pot_sort/PotSort.tsx";

function PotMain() {
  const [shouldShowPlaceholder, setShouldShowPlaceholder] = useState(false);

  return (
    <div className="flex flex-col gap-6 whitespace-nowrap">
      <div className="bg-shade-100 flex justify-between gap-8 overflow-visible rounded-md px-4 py-5">
        <PotFilter />

        <PotSort />
      </div>

      {shouldShowPlaceholder && <PotPlaceholder />}

      <PotBoard
        shouldShowPlaceholder={shouldShowPlaceholder}
        setShouldShowPlaceholder={setShouldShowPlaceholder}
      />
    </div>
  );
}

export default PotMain;
