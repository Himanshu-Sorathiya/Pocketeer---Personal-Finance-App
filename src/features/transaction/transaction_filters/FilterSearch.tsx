import { useStore } from "@tanstack/react-store";

import {
  handleSearchChange,
  transactionStore,
} from "../store/transactionStore.ts";

function FilterSearch() {
  const searchedRecipient: string = useStore(
    transactionStore,
    (s) => s.searchedRecipient,
  );

  return (
    <div
      className={`relative flex w-72 items-center gap-2 rounded-md bg-white p-3 caret-black outline-1 outline-gray-300 transition-all duration-100 focus-within:text-gray-700 focus-within:outline-gray-500 ${
        searchedRecipient === ""
          ? "text-gray-700 outline-gray-300"
          : "text-gray-500 outline-gray-500"
      }`}
    >
      <input
        type="text"
        name="search"
        value={searchedRecipient}
        onChange={(e) => {
          handleSearchChange(e.target.value);
        }}
        placeholder="Search..."
        className="w-full bg-transparent outline-none"
      />

      <svg className="h-6 w-6">
        <use href="/src/assets/icons/ui_icons_sprite.svg#search"></use>
      </svg>

      <div className="absolute right-1 bottom-0 text-[10px] text-gray-500">
        {transactionStore.state.searchedRecipient.length}/
        {transactionStore.state.maxSearchLength}
      </div>
    </div>
  );
}

export default FilterSearch;
