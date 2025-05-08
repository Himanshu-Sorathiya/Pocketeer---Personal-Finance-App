import { useStore } from "@tanstack/react-store";

import { handleSearchChange, potStore } from "../store/potStore.ts";

import Icon from "../../../components/ui/Icon.tsx";

function FilterSearch() {
  const searchedPot: string = useStore(potStore, (s) => s.searchedPot);

  return (
    <div
      className={`relative flex w-72 items-center gap-2 rounded-md bg-white p-3 caret-black outline-1 outline-gray-300 transition-all duration-100 focus-within:text-gray-700 focus-within:outline-gray-500 ${
        searchedPot === ""
          ? "text-gray-700 outline-gray-300"
          : "text-gray-500 outline-gray-500"
      }`}
    >
      <input
        type="text"
        name="search"
        value={searchedPot}
        onChange={(e) => {
          handleSearchChange(e.target.value);
        }}
        placeholder="Search..."
        className="w-full bg-transparent outline-none"
      />

      <Icon id="search" className="size-6" />

      <div className="absolute right-1 -bottom-5 text-xs text-gray-500">
        {potStore.state.maxSearchLength - potStore.state.searchedPot.length}{" "}
        characters left
      </div>
    </div>
  );
}

export default FilterSearch;
