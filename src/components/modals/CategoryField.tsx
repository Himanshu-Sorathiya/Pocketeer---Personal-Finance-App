import { type Dispatch, type SetStateAction, useState } from "react";

import transactionCategories from "../../constants/transactionCategory.ts";

function CategoryField({ field, items }: { field: any; items?: any }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-800">Category</label>

      <div className="relative">
        <div
          onMouseEnter={() => setOpenDropdown(true)}
          onMouseLeave={() => setOpenDropdown(false)}
          onClick={() => setOpenDropdown(!openDropdown)}
          className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-3 text-left caret-black transition-all duration-100 ${
            field.state.value
              ? "text-gray-700 outline-1 outline-gray-500"
              : "text-gray-500 outline-1 outline-gray-400"
          }`}
        >
          <span className="flex-1 truncate capitalize">
            {field.state.value
              .split("_")
              .map(
                (part: string) =>
                  part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
              )
              .join(" & ") || "Select a category"}
          </span>

          {openDropdown ? (
            <svg className="size-5">
              <use href="/src/assets/icons/ui_icons_sprite.svg#chevron-up" />
            </svg>
          ) : (
            <svg className="size-5">
              <use href="/src/assets/icons/ui_icons_sprite.svg#chevron-down" />
            </svg>
          )}
        </div>

        {openDropdown && (
          <CategoryDropDown
            field={field}
            setOpenDropdown={setOpenDropdown}
            items={items}
          />
        )}
      </div>
    </div>
  );
}

function CategoryDropDown({
  field,
  setOpenDropdown,
  items,
}: {
  field: any;
  setOpenDropdown: Dispatch<SetStateAction<boolean>>;
  items?: any;
}) {
  const availableCategories = transactionCategories
    .map((c) => ({
      category: c,
      used: items?.some((b: any) => b.category === c) ?? false,
    }))
    .filter((c) => !items || !c.used);

  return (
    <div
      onMouseEnter={() => setOpenDropdown(true)}
      onMouseLeave={() => setOpenDropdown(false)}
      className="absolute z-10 block max-h-44 w-full overflow-y-auto rounded-md border border-gray-100 bg-white px-2 py-1 shadow-md"
    >
      {availableCategories.map((cat) => (
        <button
          key={cat.category}
          onClick={() => {
            if (!cat.used) {
              field.handleChange(cat.category);
              setOpenDropdown(false);
            }
          }}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-sm text-nowrap text-gray-600 hover:bg-gray-100 hover:text-gray-700 ${
            cat.used
              ? "cursor-not-allowed text-gray-500 opacity-50"
              : "cursor-grab"
          }`}
          style={{
            backgroundColor:
              field.state.value === cat.category ? "#f3f4f6" : "",
            color: field.state.value === cat.category ? "#364153" : "",
            fontWeight: field.state.value === cat.category ? "500" : "400",
          }}
        >
          <span className="flex-1 truncate capitalize">
            {cat.category
              .split("_")
              .map(
                (part) =>
                  part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
              )
              .join(" & ")}
          </span>

          {cat.used && (
            <span className="text-xs text-gray-500">Already made Budget</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default CategoryField;
