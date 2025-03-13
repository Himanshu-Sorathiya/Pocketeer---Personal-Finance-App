import { type Dispatch, type SetStateAction, useState } from 'react';

import DropDownMenu from "../../components/ui/DropDownMenu.tsx";

import type { SelectedOptions } from "./transaction.types.ts";

function TransactionFilter() {
  return (
    <div className="mt-1 flex min-w-full gap-8">
      <SearchFilter />

      <CategoryFilter />
    </div>
  );
}

function SearchFilter() {
  return (
    <div className="flex w-72 items-center gap-2 rounded-md bg-white p-3 text-gray-500 outline-1 outline-gray-300 focus-within:text-gray-700 focus-within:outline-gray-500">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="w-full bg-transparent outline-none"
      />

      <svg className="h-6 w-6">
        <use href="/src/assets/icons/ui_icons_sprite.svg#search"></use>
      </svg>
    </div>
  );
}

function CategoryFilter() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (columnId: string) => {
    setOpenDropdown((prev) => (prev === columnId ? null : columnId));
  };

  const categoryOptions = {
    category: [
      "Default",
      "Entertainment",
      "Bills",
      "Food",
      "Transportation",
      "Education",
      "Shopping",
      "Health & Fitness",
      "Savings",
      "Investments",
      "Debt & Loans",
      "Income",
      "Taxes",
      "Miscellaneous",
      "General",
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState<SelectedOptions>({
    type: "category",
    value: "Default",
  });
  return (
    <div
      onClick={() =>
        setOpenDropdown(openDropdown === "category" ? null : "category")
      }
      className="relative flex w-52 items-center justify-between gap-0.5 rounded-md bg-white p-3 text-gray-500 outline-1 outline-gray-300"
    >
      <span>
        {selectedCategory.value === "Default"
          ? "Select Category"
          : selectedCategory.value}
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
    <div
      onMouseEnter={() => setOpenDropdown("category")}
      onMouseLeave={() => setOpenDropdown(null)}
      className="relative flex items-center"
    >
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

export default TransactionFilter;
