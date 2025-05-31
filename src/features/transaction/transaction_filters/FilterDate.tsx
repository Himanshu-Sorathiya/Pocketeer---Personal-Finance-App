import { type Dispatch, type SetStateAction, useState } from "react";

import { useStore } from "@tanstack/react-store";
import { format } from "date-fns";

import {
  handleDateRangeChange,
  transactionStore,
} from "../store/transactionStore.ts";

import { useUser } from "../../auth/hooks/useUser.ts";

import DropDownWeekPicker from "../../../components/dropdowns/DropDownWeekPicker.tsx";
import Icon from "../../../components/ui/Icon.tsx";

import {
  dateFormats,
  isDefaultDateRange,
} from "../../../utilities/dateUtils.ts";

function FilterDate() {
  const { currency_code } = useUser();

  const selectedWeek: [Date, Date] = useStore(
    transactionStore,
    (s) => s.selectedWeek,
  );

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div
      onMouseEnter={() => setOpenDropdown("date")}
      onMouseLeave={() => setOpenDropdown(null)}
      className={`relative flex cursor-pointer items-center justify-between gap-0.5 rounded-md bg-white p-3 text-gray-700 outline-1 transition-all duration-100 ${
        isDefaultDateRange(selectedWeek[0], selectedWeek[1])
          ? "outline-gray-300"
          : "outline-gray-500"
      }`}
    >
      <span>
        {isDefaultDateRange(selectedWeek[0], selectedWeek[1])
          ? "Select Week"
          : `${format(selectedWeek[0], dateFormats[currency_code!] ?? "dd/MM/yyyy")} - ${format(selectedWeek[1], dateFormats[currency_code!] ?? "dd/MM/yyyy")}`}
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
  const selectedWeek: [Date, Date] = useStore(
    transactionStore,
    (s) => s.selectedWeek,
  );

  return (
    <div className="relative flex items-center">
      <button
        onClick={() =>
          setOpenDropdown((prev) => (prev === "date" ? null : "date"))
        }
        className="cursor-pointer rounded p-0.5 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100"
      >
        {isDefaultDateRange(selectedWeek[0], selectedWeek[1]) ? (
          <Icon id="calendar" className="size-6" />
        ) : (
          <Icon id="calendar-range" className="size-6" />
        )}
      </button>

      {openDropdown === "date" && (
        <DropDownWeekPicker
          selectedWeek={selectedWeek}
          setSelectedWeek={handleDateRangeChange}
        />
      )}
    </div>
  );
}

export default FilterDate;
