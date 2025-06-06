import { type Dispatch, type SetStateAction, useState } from "react";

import { useStore } from "@tanstack/react-store";

import {
  handleTypeChange,
  transactionStore,
} from "../store/transactionStore.ts";

import DropDownMenu from "../../../components/dropdowns/DropDownMenu.tsx";
import Icon from "../../../components/ui/Icon.tsx";

import type { SelectedOptions } from "../../../types/global.types.ts";

import { typeOptions } from "../../../constants/appOptions.ts";

function FilterType() {
  const selectedType: SelectedOptions = useStore(
    transactionStore,
    (s) => s.selectedType,
  );

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div
      onMouseEnter={() => setOpenDropdown("type")}
      onMouseLeave={() => setOpenDropdown(null)}
      className={`relative flex cursor-pointer items-center justify-between gap-0.5 rounded-md bg-white p-3 text-gray-700 outline-1 transition-all duration-100 ${
        selectedType.value === "all" ? "outline-gray-300" : "outline-gray-500"
      }`}
    >
      <span>
        {selectedType.value === "all"
          ? "Select Type"
          : selectedType.value
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" & ")}
      </span>

      <FilterDropDown
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
    </div>
  );
}

function FilterDropDown({
  openDropdown,
  setOpenDropdown,
}: {
  openDropdown: string | null;
  setOpenDropdown: Dispatch<SetStateAction<string | null>>;
}) {
  const selectedType: SelectedOptions = useStore(
    transactionStore,
    (s) => s.selectedType,
  );

  return (
    <div className="relative flex items-center">
      <button
        onClick={() =>
          setOpenDropdown((prev) => (prev === "type" ? null : "type"))
        }
        className="cursor-pointer rounded p-0.5 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100"
      >
        <Icon id="filter" className="size-6" />
      </button>

      {openDropdown === "type" && (
        <DropDownMenu
          id="type"
          options={{ type: typeOptions.type }}
          setOpenDropdown={setOpenDropdown}
          selectedOption={selectedType}
          setSelectedOption={handleTypeChange}
        />
      )}
    </div>
  );
}

export default FilterType;
