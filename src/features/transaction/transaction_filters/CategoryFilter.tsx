import { type Dispatch, type SetStateAction, useState } from 'react';

import DropDownMenu from "../../../components/ui/DropDownMenu.tsx";

import type { SelectedOptions } from "../transaction.types.ts";

function CategoryFilter({
  categoryOptions,
  selectedCategory,
  setSelectedCategory,
}: {
  categoryOptions: Record<string, string[]>;
  selectedCategory: SelectedOptions;
  setSelectedCategory: Dispatch<SetStateAction<SelectedOptions>>;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (columnId: string) => {
    setOpenDropdown((prev) => (prev === columnId ? null : columnId));
  };

  return (
    <div
      onClick={() =>
        setOpenDropdown(openDropdown === "category" ? null : "category")
      }
      onMouseEnter={() => setOpenDropdown("category")}
      onMouseLeave={() => setOpenDropdown(null)}
      className="relative flex w-52 cursor-pointer items-center justify-between gap-0.5 rounded-md bg-white p-3 text-gray-700 outline-1 outline-gray-300"
    >
      <span>
        {selectedCategory.value === "default"
          ? "Select Category"
          : selectedCategory.value
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" & ")}
      </span>

      <FilterDropDown
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        toggleDropdown={toggleDropdown}
        categoryOptions={categoryOptions}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

function FilterDropDown({
  openDropdown,
  setOpenDropdown,
  toggleDropdown,
  categoryOptions,
  selectedCategory,
  setSelectedCategory,
}: {
  openDropdown: string | null;
  setOpenDropdown: Dispatch<SetStateAction<string | null>>;
  toggleDropdown: (columnId: string) => void;
  categoryOptions: Record<string, string[]>;
  selectedCategory: SelectedOptions;
  setSelectedCategory: Dispatch<SetStateAction<SelectedOptions>>;
}) {
  return (
    <div className="relative flex items-center">
      <button
        onClick={() => toggleDropdown("category")}
        className="cursor-pointer rounded p-0.5 focus-within:bg-neutral-100 hover:bg-neutral-100"
      >
        <svg className="h-6 w-6">
          <use href="/src/assets/icons/ui_icons_sprite.svg#filter"></use>
        </svg>
      </button>

      {openDropdown === "category" && (
        <DropDownMenu
          options={{ category: categoryOptions.category }}
          id="category"
          setOpenDropdown={setOpenDropdown}
          selectedOption={selectedCategory}
          setSelectedOption={setSelectedCategory}
        />
      )}
    </div>
  );
}

export default CategoryFilter;
