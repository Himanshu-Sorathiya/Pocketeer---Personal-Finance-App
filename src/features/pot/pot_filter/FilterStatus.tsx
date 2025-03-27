import { type Dispatch, type SetStateAction, useState } from "react";

import { usePotContext } from "../context/PotContext.tsx";

import DropDownMenu from "../../../components/ui/DropDownMenu.tsx";

import statusOptions from "../../../constants/potStatusOptions.ts";

function FilterStatus() {
  const { selectedStatus } = usePotContext();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div
      onMouseEnter={() => setOpenDropdown("status")}
      onMouseLeave={() => setOpenDropdown(null)}
      className={`relative flex w-52 cursor-pointer items-center justify-between gap-0.5 rounded-md bg-white p-3 text-gray-700 outline-1 transition-all duration-100 ${
        selectedStatus.value === "all" ? "outline-gray-300" : "outline-gray-500"
      }`}
    >
      <span>
        {selectedStatus.value === "all"
          ? "Select Status"
          : selectedStatus.value
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
  const { selectedStatus, handleStatusChange } = usePotContext();

  return (
    <div className="relative flex items-center">
      <button
        onClick={() =>
          setOpenDropdown((prev) => (prev === "status" ? null : "status"))
        }
        className="cursor-pointer rounded p-0.5 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100"
      >
        <svg className="h-6 w-6">
          <use href="/src/assets/icons/ui_icons_sprite.svg#filter"></use>
        </svg>
      </button>

      {openDropdown === "status" && (
        <DropDownMenu
          id="status"
          options={{ status: statusOptions.status }}
          setOpenDropdown={setOpenDropdown}
          selectedOption={selectedStatus}
          setSelectedOption={handleStatusChange}
        />
      )}
    </div>
  );
}

export default FilterStatus;
