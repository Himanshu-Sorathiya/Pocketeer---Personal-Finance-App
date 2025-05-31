import type { SetStateAction } from "react";

import type { SelectedOptions } from "../../types/global.types.ts";

function DropDownMenu({
  options,
  id,
  setOpenDropdown,
  selectedOption,
  setSelectedOption,
}: {
  options: Record<string, string[]>;
  id: string;
  setOpenDropdown: (value: SetStateAction<string | null>) => void;
  selectedOption: SelectedOptions;
  setSelectedOption: (type: string, value: string) => void;
}) {
  return (
    <div className="absolute top-7/12 -left-20 z-10 mt-2 max-h-64 w-40 overflow-y-auto rounded-md border border-gray-100 bg-white p-1 shadow-md">
      {options[id].map((option) => (
        <button
          key={option}
          onClick={() => {
            setSelectedOption(id, option);
            setOpenDropdown(null);
          }}
          className="block w-full cursor-grab rounded-lg px-4 py-2 text-left text-sm text-nowrap text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          style={{
            backgroundColor:
              selectedOption.type === id && selectedOption.value === option
                ? "#f3f4f6"
                : "",
            color:
              selectedOption.type === id && selectedOption.value === option
                ? "#364153"
                : "",
            fontWeight:
              selectedOption.type === id && selectedOption.value === option
                ? "500"
                : "400",
          }}
        >
          {option
            .split("_")
            .map(
              (part) =>
                part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
            )
            .join(" & ")}
        </button>
      ))}
    </div>
  );
}

export default DropDownMenu;
