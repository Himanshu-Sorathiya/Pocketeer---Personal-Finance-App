import PotBoard from "./pot_board/PotBoard.tsx";
import PotFilter from "./pot_filter/PotFilter.tsx";
import PotSort from "./pot_sort/PotSort.tsx";

function PotMain() {
  return (
    <div className="flex flex-col gap-6 whitespace-nowrap">
      <div className="bg-shade-100 flex justify-between gap-8 overflow-visible rounded-md px-4 py-5">
        <PotFilter />

        <PotSort />
      </div>

      <PotBoard />
    </div>
  );
}

export default PotMain;
