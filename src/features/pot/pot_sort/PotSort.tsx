import { type Dispatch, type SetStateAction, useState } from "react";

import { useStore } from "@tanstack/react-store";

import { handleSortChange, potStore } from "../store/potStore.ts";

import DropDownStagedMenu from "../../../components/dropdowns/DropDownStagedMenu.tsx";
import Icon from "../../../components/ui/Icon.tsx";

import type { SelectedOptions } from "../../../types/global.types.ts";

import { sortOptions } from "../../../constants/appOptions.ts";

function PotSort() {
  const selectedSort: SelectedOptions = useStore(
    potStore,
    (s) => s.selectedSort,
  );

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
      />
    </div>
  );
}

function SortDropDown({
  openDropdown,
  setOpenDropdown,
}: {
  openDropdown: string | null;
  setOpenDropdown: Dispatch<SetStateAction<string | null>>;
}) {
  const selectedSort: SelectedOptions = useStore(
    potStore,
    (s) => s.selectedSort,
  );

  return (
    <div className="relative flex items-center">
      <button
        onClick={() =>
          setOpenDropdown((prev) => (prev === "progress" ? null : "progress"))
        }
        className="cursor-pointer rounded p-0.5 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100"
      >
        <Icon id="sort" className="size-6" />
      </button>

      {openDropdown === "progress" && (
        <DropDownStagedMenu
          options={sortOptions.pot}
          setOpenDropdown={setOpenDropdown}
          selectedOption={selectedSort}
          setSelectedOption={handleSortChange}
        />
      )}
    </div>
  );
}

export default PotSort;
