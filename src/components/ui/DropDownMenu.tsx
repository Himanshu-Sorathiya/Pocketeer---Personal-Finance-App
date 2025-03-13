import type { Dispatch, SetStateAction } from "react";

import type { SelectedOptions } from "../../features/transaction/transaction.types.ts";

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
  setSelectedOption: Dispatch<SetStateAction<SelectedOptions>>;
}) {
  return (
    <div className="absolute top-7/12 -left-1/2 z-10 mt-2 w-40 rounded-md border border-gray-100 bg-white p-1 shadow-md">
      {options[id].map((option) => (
        <button
          key={option}
          onClick={() => {
            setSelectedOption((): SelectedOptions => {
              if (
                (id === "date" && option === "Newest") ||
                (id === "amount" && option === "Default")
              ) {
                return { type: "date", value: "Newest" };
              }

              return { type: id, value: option };
            });

            setOpenDropdown(null);
          }}
          className="block w-full rounded-lg px-4 py-2 text-left text-sm text-nowrap text-gray-500 hover:bg-gray-100 hover:text-gray-700"
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
          {option}
        </button>
      ))}
    </div>
  );
}

export default DropDownMenu;
