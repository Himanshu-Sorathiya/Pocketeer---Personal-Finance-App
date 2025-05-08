import { useStore } from "@tanstack/react-store";

import { transactionIconCacheStore } from "../../store/appCacheStore.ts";

import type { Transaction } from "../../features/transaction/types/transaction.types.ts";

function RecentTransaction({ transaction }: { transaction: Transaction }) {
  const { iconPath, bgColor } = useStore(transactionIconCacheStore).get(
    transaction.transactionId,
  ) ?? {
    iconPath: "/src/assets/icons/ui_icons_sprite.svg#fallback",
    bgColor: "#B0B0B0",
  };
  return (
    <div
      className="flex justify-between px-1 py-3 text-gray-700"
      key={transaction.transactionId}
    >
      <div className="flex items-center gap-2 font-medium">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: bgColor }}
        >
          <svg className="size-6">
            <use href={iconPath} />
          </svg>
        </div>

        <span>{transaction.recipient}</span>
      </div>

      <div className="flex flex-col items-end">
        <span
          className={`font-space-grotesk font-medium ${transaction.type === "income" && "text-green-500"}`}
        >
          {transaction.currency}
          {transaction.amount.toFixed(2)}
        </span>

        <span className="text-sm font-light">{transaction.creationDate}</span>
      </div>
    </div>
  );
}

export default RecentTransaction;
