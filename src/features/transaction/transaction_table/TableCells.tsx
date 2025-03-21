import { useState } from "react";

import DropDownActions from "../../../components/ui/DropDownActions.tsx";

import appActions from "../../../constants/appActions.ts";
import transactionIcons from "../../../constants/transactionIcons.ts";
import transactionIconsBgColors from "../../../constants/transactionIconsBgColors.ts";

function RecipientCell({
  recipient,
  category,
}: {
  recipient: string;
  category: string;
}) {
  const randomNum =
    Math.floor(
      Math.random() *
        (transactionIcons[category as keyof typeof transactionIcons] || 1),
    ) + 1;
  const iconPath = `/src/assets/icons/transaction_icons_sprite.svg#${category}${randomNum}`;
  const randomColor = transactionIconsBgColors[Math.floor(Math.random() * 14)];

  return (
    <div className="flex items-center gap-2 font-medium">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: randomColor }}
      >
        <svg className="h-6 w-6">
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

function AmountCell({ amount }: { amount: string }) {
  return <span className="font-space-grotesk font-medium">{amount}</span>;
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
          options={appActions}
          id="transaction"
          setOpenDropdown={setOpenDropdown}
        />
      )}
    </div>
  );
}

export { ActionsCell, AmountCell, CategoryCell, DateCell, RecipientCell };
