import { useState } from "react";

import DropDownActions from "../../../components/ui/DropDownActions.tsx";

import appActions from "../../../constants/appActions.ts";

function BoardActions() {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  return (
    <div className="relative flex items-center justify-center">
      <button
        onMouseEnter={() => setOpenDropdown(true)}
        onMouseLeave={() => setOpenDropdown(false)}
        onClick={() => setOpenDropdown(!openDropdown)}
        className="cursor-pointer rounded text-gray-500 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100 hover:text-gray-700"
      >
        <svg className="flex h-6 w-6 items-center justify-center">
          <use href="/src/assets/icons/ui_icons_sprite.svg#actions-horizontal"></use>
        </svg>
      </button>

      {openDropdown && (
        <DropDownActions
          options={appActions.budget}
          setOpenDropdown={setOpenDropdown}
        />
      )}
    </div>
  );
}

export default BoardActions;
