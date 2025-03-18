import type { Dispatch } from "react";

import type { Table } from "@tanstack/react-table";

import type { Transaction } from "../transaction.types.ts";

function SearchFilter({
  table,
  setSearchedRecipient,
}: {
  table: Table<Transaction>;
  setSearchedRecipient: Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex w-72 items-center gap-2 rounded-md bg-white p-3 text-gray-500 outline-1 outline-gray-300 focus-within:text-gray-700 focus-within:outline-gray-500">
      <input
        type="text"
        name="search"
        onChange={(e) => {
          table.getColumn("recipient")?.setFilterValue(e.target.value);
          setSearchedRecipient(e.target.value);
        }}
        placeholder="Search..."
        className="w-full bg-transparent outline-none"
      />

      <svg className="h-6 w-6">
        <use href="/src/assets/icons/ui_icons_sprite.svg#search"></use>
      </svg>
    </div>
  );
}

export default SearchFilter;
