import { useState } from "react";

import { useStore } from "@tanstack/react-store";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Route as transactionRoute } from "../../../routes/app/transaction.tsx";

import { budgetTransactionCacheStore } from "../../../store/appCacheStore.ts";
import { openModal } from "../../../store/appModalStore.ts";
import {
  handleCategoryChange,
  handleDateRangeChange,
  handlePageIndexChange,
  handleSearchChange,
} from "../../transaction/store/transactionStore.ts";

import DropDownActions from "../../../components/dropdowns/DropDownActions.tsx";
import RecentTransaction from "../../../components/ui/RecentTransaction.tsx";
import SummeryHeader from "../../../components/ui/SummeryHeader.tsx";
import TooltipInfo from "../../../components/ui/Tooltip.tsx";

import type { Transaction } from "../../transaction/types/transaction.types.ts";

import { themeColors } from "../../../constants/appOptions.ts";

import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
} from "../../../utilities/dateUtils.ts";

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
        {targetAmount.toFixed(2)}
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
            spent: spentAmount > targetAmount ? targetAmount : spentAmount,
            remaining: Math.max(targetAmount - spentAmount, 0),
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
                    {currency}
                    {targetAmount.toFixed(2)}
                  </span>
                </p>

                <p style={{ color: payload[0].fill }} className="mt-2">
                  Spent:{" "}
                  <span className="font-space-grotesk">
                    {currency}
                    {spentAmount.toFixed(2)}
                  </span>
                </p>
                <p style={{ color: "#364153" }}>
                  Remaining:{" "}
                  <span className="font-space-grotesk">
                    {currency}
                    {(targetAmount - spentAmount || 0).toFixed(2)}
                  </span>
                </p>
              </div>
            );
          }}
        />

        <Bar
          dataKey="spent"
          fill={
            spentAmount >= targetAmount
              ? "#d90429"
              : themeColors.find((c) => c.name === theme)?.hex
          }
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
          style={{
            backgroundColor: themeColors.find((c) => c.name === theme)?.hex,
          }}
        ></div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Spent</span>
          <span
            className={`font-space-grotesk font-medium ${spentAmount >= targetAmount ? "text-error" : "text-text"}`}
          >
            {currency}
            {spentAmount.toFixed(2)}
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
            {(targetAmount - spentAmount || 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

function ListRecentTransactions({
  id,
  category,
}: {
  id: string;
  category: string;
}) {
  const latestTransactions: Transaction[] =
    useStore(budgetTransactionCacheStore).get(id)?.transactions.slice(0, 3) ??
    [];

  return (
    <div className="rounded-md bg-orange-50 p-4 pb-2">
      <SummeryHeader
        to={transactionRoute.to}
        header="Recent Transactions"
        label="View All"
        onClick={() => {
          handleSearchChange("");
          handleCategoryChange("", category);
          handleDateRangeChange([DEFAULT_START_DATE, DEFAULT_END_DATE]);
          handlePageIndexChange(0);
        }}
      >
        <TooltipInfo
          id="info-circle"
          text1="Only recent transactions made after budget creation are considered. View all to explore older records for this category."
          className="text-primary size-4"
        />
      </SummeryHeader>

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
            <RecentTransaction
              key={transaction.transactionId}
              transaction={transaction}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ListActions({ selectedBudgetId }: { selectedBudgetId: string }) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  function handleActionClick(action: string) {
    if (action === "edit") openModal("edit_budget", selectedBudgetId);
    else if (action === "delete") openModal("delete_budget", selectedBudgetId);
  }

  return (
    <div className="relative flex items-center justify-center">
      <button
        onMouseEnter={() => setOpenDropdown(true)}
        onMouseLeave={() => setOpenDropdown(false)}
        onClick={() => setOpenDropdown(!openDropdown)}
        className="cursor-pointer rounded text-gray-500 transition-all duration-100 focus-within:bg-neutral-100 hover:bg-neutral-100 hover:text-gray-700"
      >
        <svg className="flex h-6 w-6 items-center justify-center">
          <use href="/src/assets/icons/ui_icons_sprite.svg#actions-horizontal"></use>
        </svg>
      </button>

      {openDropdown && (
        <DropDownActions
          action="budget"
          setOpenDropdown={setOpenDropdown}
          handleActionClick={handleActionClick}
        />
      )}
    </div>
  );
}

export {
  ListActions,
  ListBalance,
  ListProgressChart,
  ListProgressInfo,
  ListRecentTransactions,
};
