import { type Dispatch, type SetStateAction, useState } from "react";

import { useStore } from "@tanstack/react-store";

import {
  handleCategoryChange,
  transactionStore,
} from "../store/transactionStore.ts";

import DropDownMenu from "../../../components/ui/DropDownMenu.tsx";

import categoryOptions from "../../../constants/transactionCategoryOptions.ts";

function FilterCategory() {
  const selectedCategory = useStore(
    transactionStore,
    (s) => s.selectedCategory,
  );

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div
      onMouseEnter={() => setOpenDropdown("category")}
      onMouseLeave={() => setOpenDropdown(null)}
      className={`relative flex w-52 cursor-pointer items-center justify-between gap-0.5 rounded-md bg-white p-3 text-gray-700 outline-1 transition-all duration-100 ${
        selectedCategory.value === "all"
          ? "outline-gray-300"
          : "outline-gray-500"
      }`}
    >
      <span>
        {selectedCategory.value === "all"
          ? "Select Category"
          : selectedCategory.value
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" & ")}
      </span>

      <FilterDropDown
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
    </div>
  );
}

function FilterDropDown({
  openDropdown,
  setOpenDropdown,
}: {
  openDropdown: string | null;
  setOpenDropdown: Dispatch<SetStateAction<string | null>>;
}) {
  const selectedCategory = useStore(
    transactionStore,
    (s) => s.selectedCategory,
  );

  return (
    <div className="relative flex items-center">
      <button
        onClick={() =>
          setOpenDropdown((prev) => (prev === "category" ? null : "category"))
        }
        className="cursor-pointer rounded p-0.5 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100"
      >
        <svg className="h-6 w-6">
          <use href="/src/assets/icons/ui_icons_sprite.svg#filter"></use>
        </svg>
      </button>

      {openDropdown === "category" && (
        <DropDownMenu
          id="category"
          options={{ category: categoryOptions.category }}
          setOpenDropdown={setOpenDropdown}
          selectedOption={selectedCategory}
          setSelectedOption={handleCategoryChange}
        />
      )}
    </div>
  );
}

export default FilterCategory;
