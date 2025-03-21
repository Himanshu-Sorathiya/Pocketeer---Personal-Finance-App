import type { SetStateAction } from "react";

function DropDownActions({
  options,
  id,
  setOpenDropdown,
}: {
  options: Record<string, string[]>;
  id: string;
  setOpenDropdown: (value: SetStateAction<boolean>) => void;
}) {
  return (
    <div
      onMouseEnter={() => setOpenDropdown(true)}
      onMouseLeave={() => setOpenDropdown(false)}
      className="absolute top-7/12 -left-full z-10 mt-2 w-40 rounded-md border border-gray-100 bg-white p-1 shadow-md"
    >
      {options[id].map((option) => (
        <button
          key={option}
          onClick={() => {
            setOpenDropdown(false);
          }}
          className="block w-full cursor-grab rounded-lg px-4 py-2 text-left text-sm text-nowrap text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 focus:text-gray-700"
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

export default DropDownActions;
