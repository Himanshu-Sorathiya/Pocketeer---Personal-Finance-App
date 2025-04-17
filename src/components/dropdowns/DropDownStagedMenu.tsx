import type { SetStateAction } from "react";

import type { SelectedOptions } from "../../types/global.types.ts";

function DropDownStagedMenu({
  options,
  setOpenDropdown,
  selectedOption,
  setSelectedOption,
}: {
  options: Record<string, string[]>;
  setOpenDropdown: (value: SetStateAction<string | null>) => void;
  selectedOption: SelectedOptions;
  setSelectedOption: (type: string, value: string) => void;
}) {
  return (
    <div className="absolute top-7/12 -left-20 z-10 mt-2 w-40 rounded-md border border-gray-100 bg-white p-2 shadow-md">
      {Object.keys(options).map((key) => (
        <div key={key}>
          <div className="text-sm font-semibold text-gray-600 capitalize">
            {key}
          </div>

          {options[key].map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedOption(key, option);
                setOpenDropdown(null);
              }}
              className="block w-full cursor-grab rounded-lg px-4 py-2 text-left text-sm text-nowrap text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              style={{
                backgroundColor:
                  selectedOption.type === key && selectedOption.value === option
                    ? "#f3f4f6"
                    : "",
                color:
                  selectedOption.type === key && selectedOption.value === option
                    ? "#364153"
                    : "",
                fontWeight:
                  selectedOption.type === key && selectedOption.value === option
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
      ))}
    </div>
  );
}

export default DropDownStagedMenu;
