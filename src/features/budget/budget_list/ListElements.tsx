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
  handleDateRangeChange,
  handlePageIndexChange,
  handleSearchChange,
} from "../../transaction/store/transactionStore.ts";

import RecentTransaction from "../../../components/ui/RecentTransaction.tsx";
import TooltipInfo from "../../../components/ui/Tooltip.tsx";

import type { Transaction } from "../../transaction/types/transaction.types.ts";

import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
} from "../../../utilities/dateUtils.ts";
import { filterTransactionsByBudget } from "../budget_helpers/BudgetHelpers.ts";

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

function ListRecentTransactions({
  category,
  creationDate,
}: {
  category: string;
  creationDate: string;
}) {
  const latestTransactions: Transaction[] = filterTransactionsByBudget(
    creationDate,
    category,
  )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="rounded-md bg-orange-50 p-4 pb-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <h3 className="text-text font-semibold">Recent Transactions</h3>

          <TooltipInfo
            id="info-circle"
            text1="Only recent transactions made after budget creation are considered. View all to explore older records for this category."
            className="text-primary size-4"
          />
        </div>

        <Link
          to={transactionRoute.to}
          onClick={() => {
            handleSearchChange("");
            handleCategoryChange("", category);
            handleDateRangeChange([DEFAULT_START_DATE, DEFAULT_END_DATE]);
            handlePageIndexChange(0);
          }}
          className="group flex items-center gap-0.5"
        >
          <span className="group-hover:text-primary font-medium text-gray-700 transition-all duration-100">
            View All
          </span>

          <svg className="text-text group-hover:fill-primary size-4 fill-current transition-all duration-100">
            <use href="/src/assets/icons/ui_icons_sprite.svg#arrow-right"></use>
          </svg>
        </Link>
      </div>

      {latestTransactions.length === 0 ? (
        <div className="py-2 text-gray-500">
          No recent transactions in{" "}
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

export {
  ListBalance,
  ListProgressChart,
  ListProgressInfo,
  ListRecentTransactions,
};
