import { type Dispatch, type SetStateAction, useState } from "react";

import { useUser } from "../auth/hooks/useUser.ts";

import { currencyOptions } from "../../constants/currencyConfig.ts";

function CurrencySelector() {
  const { currency_code, currency_symbol } = useUser();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    code: currency_code ?? "",
    symbol: currency_symbol ?? "",
  });

  return (
    <div className="relative flex max-w-lg flex-col gap-1">
      <label htmlFor="currency" className="text-sm font-medium text-gray-800">
        Currency
      </label>

      <div className="relative">
        <div
          onMouseEnter={() => setOpenDropdown(true)}
          onMouseLeave={() => setOpenDropdown(false)}
          onClick={() => setOpenDropdown(!openDropdown)}
          className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-3 text-left caret-black transition-all duration-100 ${
            selectedCurrency.code
              ? "text-gray-700 outline-1 outline-gray-500"
              : "text-gray-500 outline-1 outline-gray-400"
          }`}
        >
          <span className="flex-1 truncate capitalize">
            {selectedCurrency.symbol} - ({selectedCurrency.code})
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
          <CurrencyDropDown
            setOpenDropdown={setOpenDropdown}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
        )}
      </div>
    </div>
  );
}

function CurrencyDropDown({
  setOpenDropdown,
  selectedCurrency,
  setSelectedCurrency,
}: {
  setOpenDropdown: Dispatch<SetStateAction<boolean>>;
  selectedCurrency: { code: string; symbol: string };
  setSelectedCurrency: Dispatch<
    SetStateAction<{ code: string; symbol: string }>
  >;
}) {
  const currencyList = Object.values(currencyOptions)
    .map(({ code, symbol }) => ({
      code,
      symbol,
      isCurrent: code === selectedCurrency.code,
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
            setSelectedCurrency(currency);

            setOpenDropdown(false);
          }}
          className="flex w-full cursor-grab items-center gap-3 rounded-lg px-4 py-2 text-left text-sm text-nowrap text-gray-600 hover:bg-gray-100 hover:text-gray-700"
          style={{
            backgroundColor:
              selectedCurrency.code === currency.code ? "#f3f4f6" : "",
            color: selectedCurrency.code === currency.code ? "#364153" : "",
            fontWeight: selectedCurrency.code === currency.code ? "500" : "400",
          }}
        >
          <span className="flex-1 truncate capitalize">
            {currency.symbol} - ({currency.code})
          </span>

          {currency.isCurrent && (
            <span className="text-primary text-xs font-medium">Current</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default CurrencySelector;
