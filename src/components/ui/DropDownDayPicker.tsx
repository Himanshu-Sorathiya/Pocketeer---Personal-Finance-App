import { useState } from "react";

import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { DEFAULT_END_DATE } from "../../utilities/dateUtils.ts";

function DropDownDayPicker({
  selectedDay,
  setSelectedDay,
  transactionDate,
}: {
  selectedDay: Date;
  setSelectedDay: (value: Date) => void;
  transactionDate?: string;
}) {
  const [selected, setSelected] = useState<Date>(selectedDay);
  const [month, setMonth] = useState(selected);

  const startLimit = new Date(
    new Date(transactionDate || new Date()).getFullYear(),
    new Date(transactionDate || new Date()).getMonth() - 1,
    new Date(transactionDate || new Date()).getDate(),
  );

  const defaultClassNames = getDefaultClassNames();

  function handleSelect(date: Date) {
    if (!date) {
      setSelected(new Date());
      setSelectedDay(new Date());
      return;
    }

    setSelected(date);
    setSelectedDay(date);
  }

  return (
    <div className="absolute left-8 z-20 flex w-auto items-center justify-center rounded-md border border-gray-100 bg-white px-2 py-1 shadow-md">
      <DayPicker
        animate={true}
        captionLayout="label"
        month={month}
        onMonthChange={setMonth}
        startMonth={startLimit}
        endMonth={DEFAULT_END_DATE}
        showOutsideDays={true}
        disabled={{ after: DEFAULT_END_DATE, before: startLimit }}
        ISOWeek={true}
        mode="single"
        selected={selected}
        onSelect={(date) => date && handleSelect(date)}
        components={{ CaptionLabel: CustomLabel }}
        classNames={{
          today: `text-inherit`,
          outside: `${defaultClassNames.outside} text-gray-500`,
          selected: `text-primary bg-primary/10 rounded-full font-semibold`,
          disabled: `${defaultClassNames.disabled} bg-white text-gray-400 font-normal`,
          nav: `${defaultClassNames.nav} `,
        }}
        required={true}
      />
    </div>
  );
}

function CustomLabel(props: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className="mt-3 ml-3 text-xl font-semibold text-gray-800"
    />
  );
}

export default DropDownDayPicker;
