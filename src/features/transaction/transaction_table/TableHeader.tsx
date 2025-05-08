import { type Dispatch, type SetStateAction, useState } from "react";

import { useStore } from "@tanstack/react-store";
import {
  type Header,
  type HeaderGroup,
  flexRender,
} from "@tanstack/react-table";

import {
  handleSortChange,
  transactionStore,
} from "../store/transactionStore.ts";

import DropDownMenu from "../../../components/dropdowns/DropDownMenu.tsx";
import Icon from "../../../components/ui/Icon.tsx";

import type { SelectedOptions } from "../../../types/global.types.ts";
import type { Transaction } from "../types/transaction.types.ts";

import { sortOptions } from "../../../constants/appOptions.ts";

function TableHeader({
  headerGroups,
}: {
  headerGroups: HeaderGroup<Transaction>[];
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <thead>
      {headerGroups.map((headerGroup: HeaderGroup<Transaction>) => (
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

                {sortOptions.transaction[header.id] && (
                  <SortDropDown
                    header={header}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
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
}: {
  header: Header<Transaction, unknown>;
  openDropdown: string | null;
  setOpenDropdown: Dispatch<SetStateAction<string | null>>;
}) {
  const selectedSort: SelectedOptions = useStore(
    transactionStore,
    (s) => s.selectedSort,
  );

  return (
    <div
      onMouseEnter={() => setOpenDropdown(header.id)}
      onMouseLeave={() => setOpenDropdown(null)}
      className="relative flex items-center"
    >
      <button
        onClick={() =>
          setOpenDropdown((prev) => (prev === header.id ? null : header.id))
        }
        className="cursor-pointer rounded p-0.5 focus-within:bg-neutral-100 hover:bg-neutral-100"
      >
        <Icon id="sort" className="size-4" />
      </button>

      {openDropdown === header.id && (
        <DropDownMenu
          id={header.id}
          options={sortOptions.transaction}
          setOpenDropdown={setOpenDropdown}
          selectedOption={selectedSort}
          setSelectedOption={handleSortChange}
        />
      )}
    </div>
  );
}

export default TableHeader;
