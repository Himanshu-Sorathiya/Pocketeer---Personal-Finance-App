import { type Dispatch, type SetStateAction, useState } from "react";

import { useFieldContext } from "../../hooks/useAppForm.ts";

import ErrorTooltip from "../ui/ErrorTooltip.tsx";

import { currencyOptions } from "../../constants/currencyConfig.ts";

function CurrencyField() {
  const field = useFieldContext<string>();

  const symbol = Object.values(currencyOptions).find(
    (c) => c.code === field.state.value,
  )?.symbol!;
  const emoji = Object.values(currencyOptions).find(
    (c) => c.code === field.state.value,
  )?.emoji!;

  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor="currency" className="text-sm font-medium text-gray-800">
        Currency
      </label>

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
          <span className="flex flex-1 gap-1 truncate capitalize">
            <span className="font-emoji">{emoji}</span>{" "}
            <span>
              {symbol} - ({field.state.value})
            </span>
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
          <CurrencyDropDown field={field} setOpenDropdown={setOpenDropdown} />
        )}

        {field.state.meta.isTouched && field.state.meta.errors && (
          <ErrorTooltip meta={field.state.meta} />
        )}
      </div>
    </div>
  );
}

function CurrencyDropDown({
  field,
  setOpenDropdown,
}: {
  field: any;
  setOpenDropdown: Dispatch<SetStateAction<boolean>>;
}) {
  const currencyList = Object.values(currencyOptions)
    .map(({ code, symbol, emoji }) => ({
      code,
      symbol,
      emoji,
      isCurrent: code === field.state.value,
    }))
    .sort((a, b) => (b.isCurrent ? 1 : 0) - (a.isCurrent ? 1 : 0));

  return (
    <div
      onMouseEnter={() => setOpenDropdown(true)}
      onMouseLeave={() => setOpenDropdown(false)}
      className="absolute z-20 flex max-h-44 w-full flex-col gap-1 overflow-y-auto rounded-md border border-gray-100 bg-white px-2 py-1 shadow-md"
    >
      {currencyList.map((currency) => (
        <button
          key={currency.code}
          onClick={() => {
            field.handleChange(currency.code);
            setOpenDropdown(false);
          }}
          className="flex w-full cursor-grab items-center gap-3 rounded-lg px-4 py-2 text-left text-sm text-nowrap text-gray-600 hover:bg-gray-100 hover:text-gray-700"
          style={{
            backgroundColor:
              field.state.value === currency.code ? "#f3f4f6" : "",
            color: field.state.value === currency.code ? "#364153" : "",
            fontWeight: field.state.value === currency.code ? "500" : "400",
          }}
        >
          <span className="flex flex-1 gap-1 truncate capitalize">
            <span className="font-emoji">{currency.emoji}</span>{" "}
            <span>
              {currency.symbol} - ({currency.code})
            </span>
          </span>

          {currency.isCurrent && (
            <span className="text-primary text-xs font-medium">Current</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default CurrencyField;
