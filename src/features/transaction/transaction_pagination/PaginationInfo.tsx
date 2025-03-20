function PaginationInfo({
  pageIndex,
  pageSize,
  totalRecords,
}: {
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
}) {
  const start = totalRecords === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalRecords);

  return (
    <div className="text-sm text-gray-500">
      Showing{" "}
      <span className="font-space-grotesk text-text font-semibold">
        {start}
      </span>{" "}
      to{" "}
      <span className="font-space-grotesk text-text font-semibold">{end}</span>{" "}
      of{" "}
      <span className="font-space-grotesk text-text font-semibold">
        {totalRecords}
      </span>{" "}
      transactions –{" "}
      <span className="text-gray-700">
        Every transaction echoes in your finances.
      </span>
    </div>
  );
}

export default PaginationInfo;
