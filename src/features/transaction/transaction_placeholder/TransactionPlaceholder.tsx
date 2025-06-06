import { useStore } from "@tanstack/react-store";
import { format } from "date-fns";

import { transactionStore } from "../store/transactionStore.ts";

import { useUser } from "../../auth/hooks/useUser.ts";

import type { SelectedOptions } from "../../../types/global.types.ts";

import {
  dateFormats,
  isDefaultDateRange,
} from "../../../utilities/dateUtils.ts";

function TransactionPlaceholder() {
  const { currency_code } = useUser();

  const searchedRecipient: string = useStore(
    transactionStore,
    (s) => s.searchedRecipient,
  );
  const selectedCategory: SelectedOptions = useStore(
    transactionStore,
    (s) => s.selectedCategory,
  );
  const selectedWeek: [Date, Date] = useStore(
    transactionStore,
    (s) => s.selectedWeek,
  );

  const hasSearch = searchedRecipient.trim() !== "";
  const hasCategory = selectedCategory.value !== "all";
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
            {format(
              selectedWeek[0],
              dateFormats[currency_code!] ?? "dd/MM/yyyy",
            )}
          </span>

          {" - "}
          <span className="font-semibold text-gray-700">
            {format(
              selectedWeek[0],
              dateFormats[currency_code!] ?? "dd/MM/yyyy",
            )}
          </span>

          {" Week"}
        </>
      )}
      {"."}
    </div>
  );
}

export default TransactionPlaceholder;
