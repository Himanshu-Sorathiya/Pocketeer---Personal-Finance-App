import { useState } from "react";

import { format } from "date-fns";

import { useUser } from "../../features/auth/hooks/useUser.ts";
import { useFieldContext } from "../../hooks/useAppForm.ts";

import DropDownDayPicker from "../dropdowns/DropDownDayPicker.tsx";
import ErrorTooltip from "../ui/ErrorTooltip.tsx";
import Icon from "../ui/Icon.tsx";

import { dateFormats } from "../../utilities/dateUtils.ts";

function DateField({ transactionDate }: { transactionDate?: string }) {
  const { currency_code } = useUser();

  const field = useFieldContext<string>();

  const [openDropdown, setOpenDropdown] = useState(false);

  function handleDateChange(newDate: Date) {
    field.handleChange(format(newDate, "yyyy-MM-dd"));
  }

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="date" className="text-sm font-medium text-gray-800">
        Date
      </label>

      <div
        onMouseEnter={() => setOpenDropdown(true)}
        onMouseLeave={() => setOpenDropdown(false)}
        onClick={() => setOpenDropdown(!openDropdown)}
        className="relative"
      >
        <div
          className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-3 text-left caret-black transition-all duration-100 ${
            field.state.value
              ? "text-gray-700 outline-1 outline-gray-500"
              : "text-gray-500 outline-1 outline-gray-400"
          }`}
        >
          <Icon id="calendar-days" className="size-5" />

          <span className="flex-1 truncate capitalize">
            {field.state.value
              ? format(
                  new Date(field.state.value),
                  dateFormats[currency_code!] ?? "dd/MM/yyyy",
                )
              : "Select a Date"}
          </span>
        </div>

        {openDropdown && (
          <DateDropDown
            field={field}
            openDropdown={openDropdown}
            handleDateChange={handleDateChange}
            transactionDate={transactionDate}
          />
        )}
      </div>

      {field.state.meta.isTouched && field.state.meta.errors && (
        <ErrorTooltip meta={field.state.meta} />
      )}
    </div>
  );
}

function DateDropDown({
  field,
  openDropdown,
  handleDateChange,
  transactionDate,
}: {
  field: any;
  openDropdown: boolean;
  handleDateChange: (newDate: Date) => void;
  transactionDate?: string;
}) {
  const selectedDay = field.state.value
    ? new Date(field.state.value)
    : new Date();

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {openDropdown && (
        <DropDownDayPicker
          selectedDay={selectedDay}
          setSelectedDay={handleDateChange}
          transactionDate={transactionDate}
        />
      )}
    </div>
  );
}

export default DateField;
