import PaginationControls from "./PaginationControls.tsx";
import PaginationInfo from "./PaginationInfo.tsx";

function TransactionPagination({
  pageIndex,
  pageSize,
  totalRecords,
  pageCount,
  firstPage,
  previousPage,
  nextPage,
  lastPage,
  getCanPreviousPage,
  getCanNextPage,
}: {
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
  pageCount: number;
  firstPage: () => void;
  previousPage: () => void;
  nextPage: () => void;
  lastPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
}) {
  return (
    <div className="mt-auto flex flex-col items-center gap-1">
      <PaginationInfo
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalRecords={totalRecords}
      />

      {pageCount > 1 && (
        <PaginationControls
          firstPage={firstPage}
          previousPage={previousPage}
          nextPage={nextPage}
          lastPage={lastPage}
          getCanPreviousPage={getCanPreviousPage}
          getCanNextPage={getCanNextPage}
          pageIndex={pageIndex}
        />
      )}
    </div>
  );
}

export default TransactionPagination;
