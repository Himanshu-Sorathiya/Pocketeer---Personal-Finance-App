import { useState } from "react";

import { useStore } from "@tanstack/react-store";

import { transactionIconCacheStore } from "../../../store/appCacheStore.ts";
import { handleOpenModal } from "../../../store/appModalStore.ts";

import DropDownActions from "../../../components/dropdowns/DropDownActions.tsx";
import Icon from "../../../components/ui/Icon.tsx";

import type { TransactionType } from "../../../constants/transactionConfig.ts";

function RecipientCell({
  transactionId,
  recipient,
}: {
  transactionId: string;
  recipient: string;
}) {
  const { iconPath, bgColor } = useStore(transactionIconCacheStore).get(
    transactionId,
  ) ?? {
    iconPath: "/src/assets/icons/ui_icons_sprite.svg#fallback",
    bgColor: "#B0B0B0",
  };

  return (
    <div className="flex items-center gap-2 font-medium">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: bgColor }}
      >
        <svg className="size-6">
          <use href={iconPath} />
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
  currency,
  type,
}: {
  amount: number;
  currency: string | undefined;
  type: TransactionType;
}) {
  return (
    <span
      className={`font-space-grotesk font-semibold ${type === "income" && "text-green-500"}`}
    >
      {currency}
      {amount.toFixed(2)}
    </span>
  );
}

function ActionsCell({
  transactionId,
  category,
}: {
  transactionId: string;
  category: string;
}) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  function handleActionClick(action: string) {
    if (action === "edit") handleOpenModal("edit_transaction", transactionId);
    else if (action === "delete")
      handleOpenModal("delete_transaction", transactionId);
  }

  return (
    <div className="relative flex items-center justify-center">
      <button
        onMouseEnter={() => setOpenDropdown(true)}
        onMouseLeave={() => setOpenDropdown(false)}
        onClick={() => setOpenDropdown(!openDropdown)}
        className="cursor-pointer rounded text-gray-500 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100 hover:text-gray-700"
      >
        <Icon id="actions-vertical" className="size-6" />
      </button>

      {openDropdown && (
        <DropDownActions
          action="transaction"
          setOpenDropdown={setOpenDropdown}
          handleActionClick={handleActionClick}
          disabled={category === "savings"}
        />
      )}
    </div>
  );
}

export { ActionsCell, AmountCell, CategoryCell, DateCell, RecipientCell };
