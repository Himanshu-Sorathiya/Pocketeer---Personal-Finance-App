import { useState } from 'react';

import { DayPicker } from 'react-day-picker';

function DropDownDayPicker() {
  const today = new Date();
  const [selected, setSelected] = useState<Date>();
  const [month, setMonth] = useState(today);

  return (
    <div className="absolute top-7/12 -left-24 z-10 mt-2 flex w-80 items-center justify-center rounded-md border border-gray-100 bg-white p-2 shadow-md">
      <DayPicker
        animate={true}
        captionLayout="dropdown"
        month={month}
        onMonthChange={setMonth}
        defaultMonth={new Date()}
        endMonth={new Date()}
        showOutsideDays={true}
        disabled={{ after: new Date() }}
        ISOWeek={true}
        mode="single"
        selected={selected}
        onSelect={setSelected}
        classNames={{
          today: `text-primary font-medium`,
          selected:
            "ring-2 ring-primary/75 text-primary font-semibold rounded-md",
          outside: "text-gray-400",
        }}
      />
    </div>
  );
}

export default DropDownDayPicker;
