import { useState } from 'react';

import DropDownDayPicker from "../../../components/ui/DropDownDayPicker.tsx";

function DateFilter() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (columnId: string) => {
    setOpenDropdown((prev) => (prev === columnId ? null : columnId));
  };

  return (
    <div
      onMouseEnter={() => setOpenDropdown("date")}
      onMouseLeave={() => setOpenDropdown(null)}
      className="relative flex w-52 cursor-pointer items-center justify-between gap-0.5 rounded-md bg-white p-3 text-gray-700 outline-1 outline-gray-300"
    >
      <span>Date Filter</span>

      <DateDropDown
        openDropdown={openDropdown}
        toggleDropdown={toggleDropdown}
      />
    </div>
  );
}

function DateDropDown({
  openDropdown,
  toggleDropdown,
}: {
  openDropdown: string | null;
  toggleDropdown: (columnId: string) => void;
}) {
  return (
    <div className="relative flex items-center">
      <button
        onClick={() => toggleDropdown("date")}
        className="cursor-pointer rounded p-0.5 focus-within:bg-neutral-100 hover:bg-neutral-100"
      >
        <svg className="h-6 w-6">
          <use href="/src/assets/icons/ui_icons_sprite.svg#calendar"></use>
        </svg>
      </button>

      {openDropdown === "date" && <DropDownDayPicker />}
    </div>
  );
}

export default DateFilter;
