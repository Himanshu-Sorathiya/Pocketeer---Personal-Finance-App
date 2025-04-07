import type { ButtonHTMLAttributes, ReactNode } from "react";

function PaginationControls({
  firstPage,
  previousPage,
  nextPage,
  lastPage,
  getCanPreviousPage,
  getCanNextPage,
  pageIndex,
}: {
  firstPage: () => void;
  previousPage: () => void;
  nextPage: () => void;
  lastPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  pageIndex: number;
}) {
  return (
    <div className="flex gap-5">
      <PaginationButton
        onClick={() => firstPage()}
        disabled={!getCanPreviousPage()}
      >
        <svg className="h-5 w-5" aria-hidden="true">
          <use href="/src/assets/icons/ui_icons_sprite.svg#chevron-double-left" />
        </svg>
        <span>First Page</span>
      </PaginationButton>

      <PaginationButton
        onClick={() => previousPage()}
        disabled={!getCanPreviousPage()}
      >
        <svg className="h-5 w-5" aria-hidden="true">
          <use href="/src/assets/icons/ui_icons_sprite.svg#chevron-left" />
        </svg>
        <span>Previous Page</span>
      </PaginationButton>

      <div className="flex size-12 items-center justify-center rounded-md bg-neutral-100 px-4 py-2">
        {pageIndex + 1}
      </div>

      <PaginationButton onClick={() => nextPage()} disabled={!getCanNextPage()}>
        <span>Next Page</span>
        <svg className="h-5 w-5" aria-hidden="true">
          <use href="/src/assets/icons/ui_icons_sprite.svg#chevron-right" />
        </svg>
      </PaginationButton>

      <PaginationButton onClick={() => lastPage()} disabled={!getCanNextPage()}>
        <span>Last Page</span>
        <svg className="h-5 w-5" aria-hidden="true">
          <use href="/src/assets/icons/ui_icons_sprite.svg#chevron-double-right" />
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
