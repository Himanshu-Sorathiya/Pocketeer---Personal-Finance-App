import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { Table } from "@tanstack/react-table";

import type { Transaction } from "../transaction.types.ts";

function PaginationControls({ table }: { table: Table<Transaction> }) {
  return (
    <div className="flex gap-5">
      <PaginationButton
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <svg className="h-5 w-5" aria-hidden="true">
          <use href="/src/assets/icons/ui_icons_sprite.svg#page-first" />
        </svg>
        <span>First Page</span>
      </PaginationButton>

      <PaginationButton
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <svg className="h-5 w-5" aria-hidden="true">
          <use href="/src/assets/icons/ui_icons_sprite.svg#page-prev" />
        </svg>
        <span>Previous Page</span>
      </PaginationButton>

      <div className="flex size-12 items-center justify-center rounded-md bg-neutral-100 px-4 py-2">
        {table.getState().pagination.pageIndex + 1}
      </div>

      <PaginationButton
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span>Next Page</span>
        <svg className="h-5 w-5" aria-hidden="true">
          <use href="/src/assets/icons/ui_icons_sprite.svg#page-next" />
        </svg>
      </PaginationButton>

      <PaginationButton
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        <span>Last Page</span>
        <svg className="h-5 w-5" aria-hidden="true">
          <use href="/src/assets/icons/ui_icons_sprite.svg#page-last" />
        </svg>
      </PaginationButton>
    </div>
  );
}

function PaginationButton({
  children,
  ...props
}: {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="disabled:text-shade-40 flex cursor-pointer items-center gap-0.5 rounded-md px-4 py-2 hover:bg-neutral-100 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export default PaginationControls;
