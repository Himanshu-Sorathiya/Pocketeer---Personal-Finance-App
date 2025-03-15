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
  setSelectedOption:
    | Dispatch<SetStateAction<SelectedOptions>>
    | ((newCategory: string) => void);
}) {
  return (
    <div className="absolute top-7/12 -left-1/2 z-10 mt-2 w-40 rounded-md border border-gray-100 bg-white p-1 shadow-md">
      {options[id].map((option) => (
        <button
          key={option}
          onClick={() => {
            if (typeof setSelectedOption === "function") {
              if (typeof selectedOption.value === "string") {
                (setSelectedOption as (newCategory: string) => void)(option);
              } else {
                (
                  setSelectedOption as Dispatch<SetStateAction<SelectedOptions>>
                )({
                  type: id === "amount" && option === "default" ? "date" : id,
                  value:
                    id === "amount" && option === "default" ? "newest" : option,
                });
              }
            }

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
