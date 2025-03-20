import { useState } from "react";

import DropDownDayPicker from "../../../components/ui/DropDownDayPicker.tsx";
import { isDefaultDateRange } from "../../../utilities/dateUtils.ts";

function DateFilter({
  selectedWeek,
  setSelectedWeek,
}: {
  selectedWeek: [Date, Date];
  setSelectedWeek: (value: [Date, Date]) => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (columnId: string) => {
    setOpenDropdown((prev) => (prev === columnId ? null : columnId));
  };

  return (
    <div
      onMouseEnter={() => setOpenDropdown("date")}
      onMouseLeave={() => setOpenDropdown(null)}
      className={`relative flex w-52 cursor-pointer items-center justify-between gap-0.5 rounded-md bg-white p-3 text-gray-700 outline-1 transition-all duration-100 ${
        isDefaultDateRange(selectedWeek[0], selectedWeek[1])
          ? "outline-gray-300"
          : "outline-gray-500"
      }`}
    >
      <span>
        {isDefaultDateRange(selectedWeek[0], selectedWeek[1])
          ? "Select Week"
          : `${selectedWeek[0].getDate()}/${selectedWeek[0].getMonth() + 1}/${selectedWeek[0].getFullYear() % 100} - ${selectedWeek[1].getDate()}/${selectedWeek[1].getMonth() + 1}/${selectedWeek[1].getFullYear() % 100}`}
      </span>

      <DateDropDown
        openDropdown={openDropdown}
        toggleDropdown={toggleDropdown}
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
      />
    </div>
  );
}

function DateDropDown({
  openDropdown,
  toggleDropdown,
  selectedWeek,
  setSelectedWeek,
}: {
  openDropdown: string | null;
  toggleDropdown: (columnId: string) => void;
  selectedWeek: [Date, Date];
  setSelectedWeek: (value: [Date, Date]) => void;
}) {
  return (
    <div className="relative flex items-center">
      <button
        onClick={() => toggleDropdown("date")}
        className="cursor-pointer rounded p-0.5 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100"
      >
        <svg className="h-6 w-6">
          <use href="/src/assets/icons/ui_icons_sprite.svg#calendar"></use>
        </svg>
      </button>

      {openDropdown === "date" && (
        <DropDownDayPicker
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
        />
      )}
    </div>
  );
}

export default DateFilter;
