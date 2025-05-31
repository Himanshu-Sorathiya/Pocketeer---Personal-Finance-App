import { useStore } from "@tanstack/react-store";
import { format } from "date-fns";

import { transactionIconCacheStore } from "../../store/appCacheStore.ts";

import { useUser } from "../../features/auth/hooks/useUser.ts";

import type { Transaction } from "../../features/transaction/types/transaction.types.ts";

import { dateFormats } from "../../utilities/dateUtils.ts";

function RecentTransaction({ transaction }: { transaction: Transaction }) {
  const { currency_symbol, currency_code } = useUser();

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
          {currency_symbol}
          {transaction.amount.toFixed(2)}
        </span>

        <span className="text-sm font-light">
          {format(
            new Date(transaction.creationDate),
            dateFormats[currency_code!] ?? "dd/MM/yyyy",
          )}
        </span>
      </div>
    </div>
  );
}

export default RecentTransaction;
