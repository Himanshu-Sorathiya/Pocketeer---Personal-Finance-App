import { type Dispatch, type SetStateAction, useState } from "react";

import { useTransactionContext } from "../context/TransactionContext.tsx";

import DropDownDayPicker from "../../../components/ui/DropDownDayPicker.tsx";

import { isDefaultDateRange } from "../../../utilities/dateUtils.ts";

function DateFilter() {
  const { selectedWeek } = useTransactionContext();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
        setOpenDropdown={setOpenDropdown}
      />
    </div>
  );
}

function DateDropDown({
  openDropdown,
  setOpenDropdown,
}: {
  openDropdown: string | null;
  setOpenDropdown: Dispatch<SetStateAction<string | null>>;
}) {
  const { selectedWeek, handleDateRangeChange } = useTransactionContext();

  return (
    <div className="relative flex items-center">
      <button
        onClick={() =>
          setOpenDropdown((prev) => (prev === "date" ? null : "date"))
        }
        className="cursor-pointer rounded p-0.5 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100"
      >
        {isDefaultDateRange(selectedWeek[0], selectedWeek[1]) ? (
          <svg className="h-6 w-6">
            <use href="/src/assets/icons/ui_icons_sprite.svg#calendar"></use>
          </svg>
        ) : (
          <svg className="h-6 w-6">
            <use href="/src/assets/icons/ui_icons_sprite.svg#calendar-range"></use>
          </svg>
        )}
      </button>

      {openDropdown === "date" && (
        <DropDownDayPicker
          selectedWeek={selectedWeek}
          setSelectedWeek={handleDateRangeChange}
        />
      )}
    </div>
  );
}

export default DateFilter;
