import { Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Route as transactionRoute } from "../../../routes/app/transaction.tsx";

import {
  handleCategoryChange,
  handlePageIndexChange,
} from "../../transaction/store/transactionStore.ts";
import { getTransactionData } from "../../transaction/store/transactionStyleStore.ts";

import { getTransactions } from "../../transaction/data/transaction_data.ts";

import type { Transaction } from "../../transaction/types/transaction.types.ts";

function ListBalance({
  targetAmount,
  currency,
}: {
  targetAmount: number;
  currency: string;
}) {
  return (
    <div className="text-sm font-normal text-gray-500">
      Capped at{" "}
      <span className="text-text font-space-grotesk font-semibold">
        {currency}
        {targetAmount}
      </span>
    </div>
  );
}

function ListProgressChart({
  spentAmount,
  targetAmount,
  currency,
  theme,
}: {
  spentAmount: number;
  targetAmount: number;
  currency: string;
  theme: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={30}>
      <BarChart
        layout="vertical"
        data={[
          {
            spent: spentAmount,
            remaining: targetAmount - spentAmount,
          },
        ]}
      >
        <XAxis type="number" domain={[0, targetAmount]} hide />
        <YAxis type="category" dataKey="name" hide />

        <Tooltip
          content={({ active, payload, coordinate }: any) => {
            if (!active || !payload || payload.length === 0 || !coordinate)
              return null;

            return (
              <div
                className="bg-shade-100 z-10 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium opacity-100 shadow-md"
                style={{
                  left: coordinate.x,
                  top: coordinate.y,
                  transform: "translate(-50%, -115%)",
                  position: "absolute",
                }}
              >
                <p style={{ color: "#364153" }}>
                  Total:{" "}
                  <span className="font-space-grotesk">
                    {targetAmount}
                    {currency}
                  </span>
                </p>

                <p style={{ color: payload[0].fill }} className="mt-2">
                  Spent:{" "}
                  <span className="font-space-grotesk">
                    {payload[0].value}
                    {currency}
                  </span>
                </p>
                <p style={{ color: "#364153" }}>
                  Remaining:{" "}
                  <span className="font-space-grotesk">
                    {payload[1].value}
                    {currency}
                  </span>
                </p>
              </div>
            );
          }}
        />

        <Bar
          dataKey="spent"
          fill={spentAmount >= targetAmount ? "#d90429" : theme}
          barSize={30}
          stackId="budget"
        />
        <Bar
          dataKey="remaining"
          fill={"#e0e0e0"}
          barSize={30}
          stackId="budget"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function ListProgressInfo({
  spentAmount,
  targetAmount,
  currency,
  theme,
}: {
  spentAmount: number;
  targetAmount: number;
  currency: string;
  theme: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center gap-4">
        <div
          className="h-10 w-1 rounded-sm"
          style={{ backgroundColor: theme }}
        ></div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Spent</span>
          <span
            className={`font-space-grotesk font-medium ${spentAmount >= targetAmount ? "text-error" : "text-text"}`}
          >
            {currency}
            {spentAmount}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-10 w-1 rounded-sm bg-orange-100"></div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Remaining</span>
          <span
            className={`font-space-grotesk font-medium ${spentAmount >= targetAmount ? "text-error" : "text-text"}`}
          >
            {currency}
            {targetAmount - spentAmount}
          </span>
        </div>
      </div>
    </div>
  );
}

function ListRecentTransactions({ category }: { category: string }) {
  const latestTransactions = getTransactions()
    .filter((t) => t.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="rounded-md bg-orange-50 p-4 pb-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-text font-semibold">Recent Transactions</span>

        <Link
          to={transactionRoute.to}
          onClick={() => {
            handleCategoryChange("", category);
            handlePageIndexChange(0);
          }}
          className="flex items-center gap-0.5"
        >
          <span className="hover:text-primary font-medium text-gray-700 transition-all duration-100">
            View All
          </span>

          <svg className="text-text size-4 fill-current">
            <use href="/src/assets/icons/ui_icons_sprite.svg#arrow-right"></use>
          </svg>
        </Link>
      </div>

      {latestTransactions.length === 0 ? (
        <div className="py-2 text-gray-500">
          No recent transactions in this{" "}
          <span className="font-semibold text-gray-700">
            {category
              .split("_")
              .map(
                (part) =>
                  part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
              )
              .join(" & ")}
          </span>{" "}
          Category.
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {latestTransactions.map((transaction) => (
            <RecentTransaction key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
}

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

export {
  ListBalance,
  ListProgressChart,
  ListProgressInfo,
  ListRecentTransactions
};
