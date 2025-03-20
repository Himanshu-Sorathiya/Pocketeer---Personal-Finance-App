import { type Dispatch, type SetStateAction, useState } from "react";

import {
  type Header,
  type HeaderGroup,
  type Table,
  flexRender,
} from "@tanstack/react-table";

import DropDownMenu from "../../../components/ui/DropDownMenu.tsx";

import type { SelectedOptions, Transaction } from "../transaction.types.ts";

function TableHeader({
  table,
  sortOptions,
  selectedSort,
  setSelectedSort,
}: {
  table: Table<Transaction>;
  sortOptions: Record<string, string[]>;
  selectedSort: SelectedOptions;
  setSelectedSort: (type: string, value: string) => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (columnId: string) => {
    setOpenDropdown((prev) => (prev === columnId ? null : columnId));
  };

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup: HeaderGroup<Transaction>) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id}>
              <div className="relative flex items-center gap-0.5 px-4 pt-2 pb-3 text-xs font-medium text-gray-500">
                <span>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </span>

                {sortOptions[header.id] && (
                  <SortDropDown
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                    toggleDropdown={toggleDropdown}
                    sortOptions={sortOptions}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                    header={header}
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

function SortDropDown({
  header,
  openDropdown,
  setOpenDropdown,
  toggleDropdown,
  sortOptions,
  selectedSort,
  setSelectedSort,
}: {
  header: Header<Transaction, unknown>;
  openDropdown: string | null;
  setOpenDropdown: Dispatch<SetStateAction<string | null>>;
  toggleDropdown: (columnId: string) => void;
  sortOptions: Record<string, string[]>;
  selectedSort: SelectedOptions;
  setSelectedSort: (type: string, value: string) => void;
}) {
  return (
    <div
      onMouseEnter={() => setOpenDropdown(header.id)}
      onMouseLeave={() => setOpenDropdown(null)}
      className="relative flex items-center"
    >
      <button
        onClick={() => toggleDropdown(header.id)}
        className="cursor-pointer rounded p-0.5 focus-within:bg-neutral-100 hover:bg-neutral-100"
      >
        <svg className="h-4 w-4">
          <use href="/src/assets/icons/ui_icons_sprite.svg#sort"></use>
        </svg>
      </button>

      {openDropdown === header.id && (
        <DropDownMenu
          options={sortOptions}
          id={header.id}
          setOpenDropdown={setOpenDropdown}
          selectedOption={selectedSort}
          setSelectedOption={setSelectedSort}
        />
      )}
    </div>
  );
}

export default TableHeader;
