import { useState } from "react";

import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  isDefaultDateRange,
} from "../../utilities/dateUtils.ts";

function isSameSelectedRange(
  newStart: Date,
  newEnd: Date,
  prevStart: Date,
  prevEnd: Date,
): boolean {
  return (
    prevStart.getTime() === newStart.getTime() &&
    prevEnd.getTime() === newEnd.getTime()
  );
}

function DropDownWeekPicker({
  selectedWeek,
  setSelectedWeek,
}: {
  selectedWeek: [Date, Date];
  setSelectedWeek: (value: [Date, Date]) => void;
}) {
  const [selected, setSelected] = useState<Date[]>(() => {
    if (isDefaultDateRange(selectedWeek[0], selectedWeek[1])) return [];

    return eachDayOfInterval({ start: selectedWeek[0], end: selectedWeek[1] });
  });
  const [month, setMonth] = useState(selected[0] ?? new Date());
  const [maxVal, setMaxVal] = useState(() => {
    if (isDefaultDateRange(selectedWeek[0], selectedWeek[1])) return 7;

    return eachDayOfInterval({ start: selectedWeek[0], end: selectedWeek[1] })
      .length;
  });

  const defaultClassNames = getDefaultClassNames();

  function handleSelect(dates: Date[]) {
    if (!dates || dates.length === 0) {
      setMaxVal(7);
      setSelected([]);
      setSelectedWeek([DEFAULT_START_DATE, DEFAULT_END_DATE]);
      return;
    }

    const today = new Date();

    const weekStart = startOfWeek(dates[0], { weekStartsOn: 1 });
    const weekEnd = endOfWeek(dates[0], { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const filteredWeekDays = weekDays.filter((day) => day <= today);

    const [prevStart, prevEnd] = selectedWeek;
    const newStart = filteredWeekDays[0];
    const newEnd = filteredWeekDays[filteredWeekDays.length - 1];

    if (isSameSelectedRange(newStart, newEnd, prevStart, prevEnd)) {
      setMaxVal(7);
      setSelected([]);
      setSelectedWeek([DEFAULT_START_DATE, DEFAULT_END_DATE]);
      return;
    }

    setMaxVal(filteredWeekDays.length);
    setSelected(filteredWeekDays);
    setSelectedWeek([
      filteredWeekDays[0],
      filteredWeekDays[filteredWeekDays.length - 1],
    ]);
  }

  return (
    <div className="absolute top-7/12 -left-24 z-10 mt-2 flex w-auto items-center justify-center rounded-md border border-gray-100 bg-white p-2 shadow-md">
      <DayPicker
        animate={true}
        captionLayout="dropdown"
        month={month}
        onMonthChange={setMonth}
        startMonth={DEFAULT_START_DATE}
        endMonth={DEFAULT_END_DATE}
        showOutsideDays={true}
        disabled={{ after: DEFAULT_END_DATE, before: DEFAULT_START_DATE }}
        ISOWeek={true}
        max={maxVal}
        mode="multiple"
        selected={selected}
        onSelect={(dates) => dates && handleSelect(dates)}
        components={{ Dropdown: CustomSelectDropdown }}
        classNames={{
          today: `text-inherit`,
          outside: `${defaultClassNames.outside} text-gray-500`,
          selected: `text-primary bg-primary/10 rounded-full font-semibold`,
          disabled: `${defaultClassNames.disabled} bg-white text-gray-400 font-normal`,
          nav: `${defaultClassNames.nav} `,
        }}
      />
    </div>
  );
}

function CustomSelectDropdown(props: {
  options?: {
    value: number;
    label: string;
    disabled?: boolean;
  }[];
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  classNames: Record<string, string>;
}) {
  const { options, value, onChange } = props;

  const handleValueChange = (newValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          value: newValue,
        },
      } as React.ChangeEvent<HTMLSelectElement>;

      onChange(syntheticEvent);
    }
  };

  return (
    <div>
      <select
        value={value}
        onChange={(e) => handleValueChange(e.target.value)}
        className="cursor-pointer rounded-lg px-1 py-2 text-left text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-0"
      >
        {options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className="text-sm text-gray-500"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDownWeekPicker;
