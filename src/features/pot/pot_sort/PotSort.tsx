import { type Dispatch, type SetStateAction, useState } from "react";

import DropDownStagedMenu from "../../../components/ui/DropDownStagedMenu.tsx";

import type { SelectedOptions } from "../../../types/global.types.ts";

import sortOptions from "../../../constants/potSortOptions.ts";

function PotSort({
  selectedSort,
  handleSortChange,
}: {
  selectedSort: SelectedOptions;
  handleSortChange: (type: string, value: string) => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div
      onMouseEnter={() => setOpenDropdown("progress")}
      onMouseLeave={() => setOpenDropdown(null)}
      className={`relative flex w-52 cursor-pointer items-center justify-between gap-0.5 rounded-md bg-white p-3 text-gray-700 outline-1 transition-all duration-100 ${
        selectedSort.value === "all" ? "outline-gray-300" : "outline-gray-500"
      }`}
    >
      <span>
        {selectedSort.type
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" & ")}
        {": "}
        {selectedSort.value
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" & ")}
      </span>

      <SortDropDown
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        selectedSort={selectedSort}
        handleSortChange={handleSortChange}
      />
    </div>
  );
}

function SortDropDown({
  openDropdown,
  setOpenDropdown,
  selectedSort,
  handleSortChange,
}: {
  openDropdown: string | null;
  setOpenDropdown: Dispatch<SetStateAction<string | null>>;
  selectedSort: SelectedOptions;
  handleSortChange: (type: string, value: string) => void;
}) {
  return (
    <div className="relative flex items-center">
      <button
        onClick={() =>
          setOpenDropdown((prev) => (prev === "progress" ? null : "progress"))
        }
        className="cursor-pointer rounded p-0.5 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100"
      >
        <svg className="h-6 w-6">
          <use href="/src/assets/icons/ui_icons_sprite.svg#sort"></use>
        </svg>
      </button>

      {openDropdown === "progress" && (
        <DropDownStagedMenu
          options={sortOptions}
          setOpenDropdown={setOpenDropdown}
          selectedOption={selectedSort}
          setSelectedOption={handleSortChange}
        />
      )}
    </div>
  );
}

export default PotSort;
