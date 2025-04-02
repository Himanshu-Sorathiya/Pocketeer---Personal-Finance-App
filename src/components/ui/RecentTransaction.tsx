import { getTransactionData } from "../../features/transaction/store/transactionStyleStore.ts";

import type { Transaction } from "../../features/transaction/types/transaction.types.ts";

function RecentTransaction({ transaction }: { transaction: Transaction }) {
  const { iconPath, bgColor } = getTransactionData(
    transaction.id,
    transaction.category,
  );

  return (
    <div
      className="flex justify-between px-1 py-3 text-gray-700"
      key={transaction.id}
    >
      <div className="flex items-center gap-2 font-medium">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: bgColor }}
        >
          <svg className="h-6 w-6">
            <use
              href={
                iconPath || "/src/assets/icons/ui_icons_sprite.svg#fallback"
              }
            />
          </svg>
        </div>

        <span>{transaction.recipient}</span>
      </div>

      <div className="flex flex-col items-end">
        <span className="font-space-grotesk font-medium">
          {transaction.currency}
          {transaction.amount}
        </span>

        <span className="text-sm font-light">{transaction.date}</span>
      </div>
    </div>
  );
}

export default RecentTransaction;
