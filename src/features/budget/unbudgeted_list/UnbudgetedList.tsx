import Tooltip from "../../../components/ui/Tooltip.tsx";

import type { TransactionCategory } from "../../transaction/types/transaction.types.ts";

function UnbudgetedList({ categories }: { categories: TransactionCategory[] }) {
  if (categories.length === 0) return null;

  return (
    <div className="bg-shade-100 rounded-md p-4">
      <div className="flex items-center gap-1">
        <h3 className="text-3xl font-medium text-gray-800">
          Unbudgeted Spending Categories
        </h3>

        <Tooltip
          id="info-circle"
          text1="Looks like these categories have been left out of your budgeting map!"
          text2="Bring them back on track by assigning a budget today."
          className="text-primary size-5"
        />
      </div>

      <div className="grid grid-cols-3 p-2">
        {categories.map((category) => (
          <span key={category} className="flex items-center gap-1.5">
            <span className="block size-2 rounded-full bg-[#B0B0B0]"></span>

            <span className="text-text">
              {category
                .split("_")
                .map(
                  (part) =>
                    part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
                )
                .join(" & ")}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default UnbudgetedList;
