import { useState } from 'react';

import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';

type DropdownOption = {
  value: number;
  label: string;
  disabled?: boolean;
};

type CustomSelectDropdownProps = {
  options?: DropdownOption[];
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  classNames: Record<string, string>;
};

function DropDownDayPicker() {
  const today = new Date();

  const [selected, setSelected] = useState<Date[]>([]);
  const [month, setMonth] = useState(today);
  const [maxVal, setMaxVal] = useState(7);

  const defaultClassNames = getDefaultClassNames();

  function handleSelect(dates: Date[]) {
    if (!dates || dates.length === 0) return;

    const today = new Date();

    const weekStart = startOfWeek(dates[0], { weekStartsOn: 1 });
    const weekEnd = endOfWeek(dates[0], { weekStartsOn: 1 });

    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const filteredWeekDays = weekDays.filter((day) => day <= today);

    setMaxVal(filteredWeekDays.length);
    setSelected(filteredWeekDays);
  }

  return (
    <div className="absolute top-7/12 -left-24 z-10 mt-2 flex w-auto items-center justify-center rounded-md border border-gray-100 bg-white p-2 shadow-md">
      <DayPicker
        animate={true}
        captionLayout="dropdown"
        month={month}
        onMonthChange={setMonth}
        defaultMonth={new Date()}
        startMonth={new Date(2020, 0, 1)}
        endMonth={new Date()}
        showOutsideDays={true}
        disabled={{ after: new Date() }}
        ISOWeek={true}
        max={maxVal}
        mode="multiple"
        selected={selected}
        onSelect={(date) => date && handleSelect(date)}
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

function CustomSelectDropdown(props: CustomSelectDropdownProps) {
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

export default DropDownDayPicker;
