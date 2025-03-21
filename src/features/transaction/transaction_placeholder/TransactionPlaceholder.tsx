import type { SelectedOptions } from "../types/transaction.types.ts";

import { isDefaultDateRange } from "../../../utilities/dateUtils.ts";

function TransactionPlaceholder({
  searchedRecipient,
  selectedCategory,
  selectedWeek,
}: {
  searchedRecipient: string;
  selectedCategory: SelectedOptions;
  selectedWeek: [Date, Date];
}) {
  const hasCategory = selectedCategory.value !== "all";
  const hasSearch = searchedRecipient.trim() !== "";
  const hasDate = !isDefaultDateRange(selectedWeek[0], selectedWeek[1]);

  if (!hasCategory && !hasSearch && !hasDate)
    return (
      <div className="text-center text-gray-500">
        <span>You haven't added any transactions yet.</span>
      </div>
    );

  return (
    <div className="text-center text-gray-500">
      No transaction found
      {hasSearch && (
        <>
          {" for "}
          <span className="font-semibold text-gray-700">
            {searchedRecipient}
          </span>
          {" Recipient"}
        </>
      )}
      {hasCategory && (
        <>
          {" in "}
          <span className="font-semibold text-gray-700">
            {selectedCategory.value
              .split("_")
              .map(
                (part) =>
                  part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
              )
              .join(" & ")}
          </span>
          {" Category"}
        </>
      )}
      {hasDate && (
        <>
          {" during "}
          <span className="font-semibold text-gray-700">
            {selectedWeek[0].toLocaleDateString()}
          </span>
          {" - "}
          <span className="font-semibold text-gray-700">
            {selectedWeek[1].toLocaleDateString()}
          </span>
          {" Week"}
        </>
      )}
      {"."}
    </div>
  );
}

export default TransactionPlaceholder;
