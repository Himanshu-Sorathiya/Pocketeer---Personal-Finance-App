import { type Dispatch, type SetStateAction, useState } from "react";

import { useFieldContext } from "../../hooks/useAppForm.ts";

import ErrorTooltip from "../ui/ErrorTooltip.tsx";

import { themeColors } from "../../constants/appOptions.ts";

function ThemeField({
  items,
  currentTheme,
}: {
  items: any;
  currentTheme?: string;
}) {
  const field = useFieldContext<string>();

  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="relative flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-800">Theme</label>

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
          <div
            className="size-5 shrink-0 rounded-full"
            style={{
              backgroundColor:
                themeColors.find((c) => c.name === field.state.value)?.hex ||
                "transparent",
            }}
          ></div>

          <span className="flex-1 truncate">
            {field.state.value
              .split("_")
              .map((w: string) => w[0].toUpperCase() + w.slice(1))
              .join(" ") || "Select a theme"}
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
          <ThemeDropDown
            field={field}
            setOpenDropdown={setOpenDropdown}
            items={items}
            currentTheme={currentTheme}
          />
        )}
      </div>

      {field.state.meta.isTouched && field.state.meta.errors && (
        <ErrorTooltip meta={field.state.meta} />
      )}
    </div>
  );
}

function ThemeDropDown({
  field,
  setOpenDropdown,
  items,
  currentTheme,
}: {
  field: any;
  setOpenDropdown: Dispatch<SetStateAction<boolean>>;
  items: any;
  currentTheme?: string;
}) {
  const availableThemeColors = themeColors
    .filter((c) => c.name !== "platinum_ash")
    .map((c) => {
      const isCurrent = c.name === currentTheme;
      const used = !isCurrent && items.some((i: any) => i.theme === c.name);

      return {
        name: c.name,
        value: c.hex,
        used,
        isCurrent,
      };
    })
    .sort((a, b) => {
      if (a.isCurrent) return -1;
      if (b.isCurrent) return 1;

      return Number(a.used) - Number(b.used);
    });

  return (
    <div
      onMouseEnter={() => setOpenDropdown(true)}
      onMouseLeave={() => setOpenDropdown(false)}
      className="absolute z-20 block max-h-44 w-full overflow-y-auto rounded-md border border-gray-100 bg-white p-1 px-2 shadow-md"
    >
      {availableThemeColors.map((color) => (
        <button
          key={color.name}
          onClick={() => {
            if (!color.used) {
              field.handleChange(color.name);
              setOpenDropdown(false);
            }
          }}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left text-sm text-nowrap text-gray-600 hover:bg-gray-100 hover:text-gray-700 ${
            color.used
              ? "cursor-not-allowed text-gray-500 opacity-50"
              : "cursor-grab"
          }`}
          style={{
            backgroundColor: field.state.value === color.name ? "#f3f4f6" : "",
            color: field.state.value === color.name ? "#364153" : "",
            fontWeight: field.state.value === color.name ? "500" : "400",
          }}
        >
          <div
            className="size-5 shrink-0 rounded-full"
            style={{ backgroundColor: color.value }}
          ></div>

          <span className="flex-1 truncate">
            {color.name
              .split("_")
              .map((w) => w[0].toUpperCase() + w.slice(1))
              .join(" ")}
          </span>

          {color.isCurrent && (
            <span className="text-primary text-xs">Current</span>
          )}

          {!color.isCurrent && color.used && (
            <span className="text-xs text-gray-500">Already used</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default ThemeField;
