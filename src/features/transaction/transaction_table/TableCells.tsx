import { useState } from "react";

import { getTransactionData } from "../store/transactionStyleStore.ts";

import DropDownActions from "../../../components/ui/DropDownActions.tsx";

import appActions from "../../../constants/appActions.ts";
import type { TransactionType } from "../types/transaction.types.ts";

function RecipientCell({
  transactionId,
  recipient,
  category,
}: {
  transactionId: string;
  recipient: string;
  category: string;
}) {
  const { iconPath, bgColor } = getTransactionData(transactionId, category);

  return (
    <div className="flex items-center gap-2 font-medium">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: bgColor }}
      >
        <svg className="h-6 w-6">
          <use
            href={iconPath || "/src/assets/icons/ui_icons_sprite.svg#fallback"}
          />
        </svg>
      </div>

      <span>{recipient}</span>
    </div>
  );
}

function CategoryCell({ category }: { category: string }) {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" & ");
}

function DateCell({ date }: { date: string }) {
  return <span>{date}</span>;
}

function AmountCell({
  amount,
  type,
}: {
  amount: string;
  type: TransactionType;
}) {
  return (
    <span
      className={`font-space-grotesk font-semibold ${type === "income" && "text-green-500"}`}
    >
      {amount}
    </span>
  );
}

function ActionsCell() {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  return (
    <div className="relative flex items-center justify-center">
      <button
        onMouseEnter={() => setOpenDropdown(true)}
        onMouseLeave={() => setOpenDropdown(false)}
        onClick={() => setOpenDropdown(!openDropdown)}
        className="cursor-pointer rounded text-gray-500 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100 hover:text-gray-700"
      >
        <svg className="flex h-6 w-6 items-center justify-center">
          <use href="/src/assets/icons/ui_icons_sprite.svg#actions-vertical"></use>
        </svg>
      </button>

      {openDropdown && (
        <DropDownActions
          options={appActions.transaction}
          setOpenDropdown={setOpenDropdown}
        />
      )}
    </div>
  );
}

export { ActionsCell, AmountCell, CategoryCell, DateCell, RecipientCell };
