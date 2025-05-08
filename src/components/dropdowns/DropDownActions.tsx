import type { SetStateAction } from "react";

import Icon from "../ui/Icon.tsx";

import { appActions } from "../../constants/appOptions.ts";

function DropDownActions({
  action,
  setOpenDropdown,
  handleActionClick,
  disabled = false,
}: {
  action: string;
  setOpenDropdown: (value: SetStateAction<boolean>) => void;
  handleActionClick: (action: string) => void;
  disabled?: boolean;
}) {
  const svgId = ["edit", "delete"];

  return (
    <div
      onMouseEnter={() => setOpenDropdown(true)}
      onMouseLeave={() => setOpenDropdown(false)}
      className="absolute top-7/12 -left-20 z-10 mt-2 w-40 rounded-md border border-gray-100 bg-white p-1 shadow-md"
    >
      {Object.entries(appActions[action]).map(([key, value], index) => (
        <button
          key={key}
          onClick={() => {
            handleActionClick(key);
            setOpenDropdown(false);
          }}
          disabled={disabled}
          className="block w-full cursor-grab rounded-lg px-4 py-2 text-left text-sm text-nowrap text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 focus:text-gray-700 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          <span className="flex items-center gap-2">
            <Icon id={`${svgId[index]}`} className="size-4 stroke-2" />

            {value
              .split("_")
              .map(
                (part) =>
                  part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
              )
              .join(" & ")}
          </span>
        </button>
      ))}
    </div>
  );
}

export default DropDownActions;
